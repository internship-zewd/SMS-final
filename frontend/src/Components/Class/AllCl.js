import React from "react";
import "../DashContent/DashContent.css";
// import './AddEm.css'
import { Table } from "react-bootstrap";
import { ViewPopup } from "./ViewPopup";
import { UpdatePopup } from "./UpdatePopup";
import { useState, useEffect, useCallback, updateState } from "react";
import api from "../../resource/api"
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AllCl() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonUpdatePopup, setButtonUpdatePopup] = useState(false);
  const [classInfo,setClassInfo]=useState({});
  // const [classInfo, setClassInfo] = useState([]);
  // const [updatePopup, setUpdatePopup] = useState(false);
 

  useEffect(() => {
    getClass();
  }, []);

  const getClass = async () => {
    await api
      .get("class_room/getAll")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
  const handleView = async (e, id) => {
    // e.preventDefault();
    return await api
      .get(`class_room/getOne/${id}`)
      .then((response) => {
        const viewData = response.data;
        setClassInfo(viewData)
        // console.log(response.data)
        console.log('This is classInfo: ',viewData)
        console.log(viewData);
        setButtonPopup(true);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
  const handleUpdate = async (e, id) => {
    // e.preventDefault();
    await api
      .get(`class_room/getOne/${id}`)
      .then((response) => {
      setClassInfo(response.data)
        // console.log(response.data)
        console.log(response.data.name);
        setButtonUpdatePopup(true);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
  const handleDelete = async (e, id) => {
    await api
      .delete(`class_room/${id}`)
      .then((res) => {
        console.log( res);
        alert(res.data)
      });
    window.location.reload();
  };
  return (
    <div className="dashContent">
      <div className="overview">
        <div className="title">
          <i className="uil uil-suitcase"></i>
          <span className="text">Class/All Classes</span>
        </div>
        <div className="content">
          <div className="user-details">
            {/* <Filter data={data} setData={setData} />  */}
            <form>
              <div className="input-box">
                <br />
                <input
                  type="text"
                  placeholder="Search Course"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  name="search"
                  value={search}
                />
              </div>
            </form>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th> Class Id.</th>
              <th>Class Name</th>
              <th>Action</th>
              {/* <th></th>
    <th>Duration</th>
    <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id_tag}</td>
                  <td>{item.full_identification}</td>
<button
                    className="btn btn-primary btn-sm me-2"
                    onClick={(e) => {
                      handleView(e, item.id);
                    }}
                  >
                    <VisibilityIcon />
                  </button>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={(e) => {
                      handleUpdate(e, item.id);
                    }}
                  >
                    <EditIcon />
                  </button>
                  <UpdatePopup
                    trigger={buttonUpdatePopup}
                    setTrigger={setButtonUpdatePopup}
                    updateProp={classInfo}
                  />

                  <ViewPopup
                    trigger={buttonPopup}
                    setTrigger={setButtonPopup}
                    classProp={classInfo}

                  />

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                  >
                    {" "}
                    <DeleteIcon />
                  </button>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AllCl;