import AdminNav from "../components/admin/nav";

const AdminLayout = (props) => {
  return (
    <div className="admin_container">
      <div className="admin_left_nav">
        <AdminNav />
      </div>

      <div className="admin_right">
        <h2>{props.title}</h2>
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;
