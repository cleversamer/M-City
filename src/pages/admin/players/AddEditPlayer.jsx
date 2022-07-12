/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../../hoc/AdminLayout";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";

import { doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, playersRef, storage } from "../../../firebase";

import { useFormik } from "formik";
import * as Yup from "yup";
import * as toasts from "../../../utils/toast";
import * as error from "../../../utils/error";
import config from "../../../config.json";

const defaultValues = {
  name: "",
  lastname: "",
  number: "",
  position: "",
};

const AddEditPlayers = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [values, setValues] = useState(defaultValues);
  const [sharedImage, setSharedImage] = useState("");

  useEffect(() => {
    const param = params[config.routes.editPlayer.param];
    if (param) {
      getDoc(getDocRef())
        .then((snapshot) => {
          if (snapshot.data()) {
            setFormType("edit");
            setValues(snapshot.data());
          } else {
            toasts.showError("Sorry, nothing was found");
          }
        })
        .catch((error) => {
          toasts.showError(error);
        });
    } else {
      setFormType("add");
      setValues(defaultValues);
    }
  }, [params[config.routes.editPlayer.param]]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("This input is required"),
      lastname: Yup.string().required("This input is required"),
      number: Yup.number()
        .required("This input is required")
        .min(0, "The minimum is cero")
        .max(100, "The max is 100"),
      position: Yup.string().required("This input is required"),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const getDocRef = () => {
    return doc(db, `/players/${params[config.routes.editPlayer.param]}`);
  };

  const submitForm = (values) => {
    let dataToSubmit = values;
    setLoading(true);

    if (formType === "add") {
      const storageRef = ref(
        storage,
        `/players/${params[config.routes.editPlayer.param]}`
      );
      const uploadTask = uploadBytesResumable(storageRef, sharedImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          toasts.showError(err.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((res) => {
              setSharedImage(res);
            })
            .catch((err) => {
              toasts.showError(err.message);
            });
        }
      );

      addDoc(playersRef, { ...dataToSubmit, image: sharedImage })
        .then(() => {
          if (!sharedImage) {
            throw new Error("No image selected for the player.");
          }

          toasts.showSuccess("Player added");
          formik.resetForm();
          navigate(config.routes.adminPlayers);
        })
        .catch((error) => {
          toasts.showError(error.message);
        });
    } else {
      updateDoc(getDocRef(), dataToSubmit)
        .then(() => {
          toasts.showSuccess("Player updated");
        })
        .catch((error) => {
          toasts.showError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleChange = (e) => {
    const image = e.currentTarget.files[0];

    if (!image) {
      alert("Please select an image.");
      return;
    }

    setSharedImage(image);
  };

  return (
    <AdminLayout title={formType === "add" ? "Add player" : "Edit player"}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            {params[config.routes.editPlayer.param] ? (
              <img
                src={sharedImage}
                alt={params[config.routes.editPlayer.param]}
              />
            ) : (
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                name="image"
                id="file"
                // style={{ display: "none" }}
                onChange={handleChange}
              />
            )}
            <hr />
            <h4>Player info</h4>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="name"
                  name="name"
                  variant="outlined"
                  placeholder="Add firstname"
                  {...formik.getFieldProps("name")}
                  {...error.textErrorHelper(formik, "name")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="lastname"
                  name="lastname"
                  variant="outlined"
                  placeholder="Add lastname"
                  {...formik.getFieldProps("lastname")}
                  {...error.textErrorHelper(formik, "lastname")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  type="number"
                  id="number"
                  name="number"
                  variant="outlined"
                  placeholder="Add number"
                  {...formik.getFieldProps("number")}
                  {...error.textErrorHelper(formik, "number")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl error={error.selectIsError(formik, "position")}>
                <Select
                  id="position"
                  name="position"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("position")}
                >
                  <MenuItem value="" disabled>
                    Select a position
                  </MenuItem>
                  <MenuItem value="Keeper">Keeper</MenuItem>
                  <MenuItem value="Defence">Defence</MenuItem>
                  <MenuItem value="Midfield">Midfield</MenuItem>
                  <MenuItem value="Striker">Striker</MenuItem>
                </Select>
                {error.selectErrorHelper(formik, "position")}
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {formType === "add" ? "Add player" : "Edit player"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditPlayers;
