import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Dropdown, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../contexts/ApiContext";
import AppContainer from "../components/AppContainer";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAdmin, sendAdminAction, draws } = useApi();

  const [admin, setAdmin] = useState(false);
  const [output, setOutput] = useState();
  const [allUsers, setAllUsers] = useState();
  const [nonEligibles, setNonEligibles] = useState();
  const [payingMembers, setPayingMembers] = useState();
  const [nonPayingMembers, setNonPayingMembers] = useState();
  const [showList, setShowList] = useState();
  const [sortList, setSortList] = useState("created_at");

  async function handleAdminAction(action) {
    // if (!allUsers) {
    const response = await sendAdminAction(action);
    if (response.status === "success" && response.response.success) {
      // get more data for every user
      // get money won
      const tempUsers = response.response.body;
      tempUsers.forEach((user) => {
        user.totalfunds = getFundsForUser(user);
        user.totalwins = getWinsForUser(user.id);
      });
      // set the users
      setAllUsers(tempUsers);
    }
    // }
  }

  function getWinsForUser(id) {
    return draws.reduce(
      (acc, curr) =>
        curr.draw_result.find((result) => result.winner_id === id)
          ? acc +
            Number(
              curr.draw_result
                .find((result) => result.winner_id === id)
                .prize.slice(1)
            )
          : acc,
      0
    );
  }

  function getFundsForUser(user) {
    return user.userdata.fundings.reduce((acc, curr) => acc + curr.amount, 0);
  }

  useEffect(() => {
    if (!allUsers) return;
    setNonEligibles(allUsers.filter((item) => item.meta.notEligible));
    setPayingMembers(
      allUsers.filter((item) => item.userdata.status === "subscription")
    );
    setNonPayingMembers(
      allUsers.filter((item) => item.userdata.status !== "subscription")
    );
  }, [allUsers]);

  useEffect(() => {
    // handleAdminAction("getAllSignedUp");
  }, []);

  return isAdmin ? (
    <AppContainer>
      <div className="p-3 d-flex flex-column gap-3">
        <div className="">
          <Button
            variant="dark"
            onClick={() => handleAdminAction("getAllSignedUp")}
          >
            Refresh members
          </Button>
        </div>
        <div>Members</div>
        <div className="pb-3 d-flex gap-3" style={{ overflowX: "auto" }}>
          {[
            { title: "Total", list: allUsers },
            { title: "Subscribed", list: payingMembers },
            { title: "Non Eligible", list: nonEligibles },
            { title: "Not Subscribed", list: nonPayingMembers },
          ].map((item, index) => {
            return (
              <Button
                key={index}
                variant="outline-dark"
                onClick={() => {
                  setShowList(item);
                }}
              >
                <div>{item.list ? item.list?.length : "-"}</div>
                <div>{item.title}</div>
              </Button>
            );
          })}
        </div>

        <Modal show={showList} fullscreen onHide={() => setShowList(false)}>
          <Modal.Header closeButton>
            {showList?.title} ({showList?.list?.length})
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex gap-3 justify-content-between">
                <Button
                  variant="dark"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      showList?.list.map((item) => item.userdata.email)
                    );
                  }}
                >
                  copy emails
                </Button>
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="cw-list-sort-drop">
                    Sort
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item as="button" onClick={() => setSortList("created_at")}>Created</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setSortList("totalfunds")}>Paid</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setSortList("totalwins")}>Won</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <Table striped hover size="sm" responsive>
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>Email</th>
                    <th>Name</th>
                    <th>Anonym</th>
                    <th>Country</th>
                    <th>Created</th>
                    <th>Paid</th>
                    <th>Won</th>
                  </tr>
                </thead>
                <tbody>
                  {showList?.list
                    ?.sort(
                      (a, b) => new Date(b[sortList]) - new Date(a[sortList])
                    )
                    .map((item) => {
                      return (
                        <tr>
                          <td>{item.userdata.email}</td>
                          <td>{item.userdata.name}</td>
                          <td>{item.userdata.anonymize ? "y" : "n"}</td>
                          <td>{item.userdata.country}</td>
                          <td>{item.created_at}</td>
                          <td>{item.totalfunds / 100}</td>
                          <td>{item.totalwins}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
        </Modal>

        <div>Draws upcoming</div>
        <div className="pb-3 d-flex gap-3" style={{ overflowX: "auto" }}>
          {draws &&
            draws
              .filter(
                (draw) =>
                  new Date(draw.date_closing).getTime() > new Date().getTime()
              )
              .sort(
                (a, b) =>
                  new Date(a.date_closing).getTime() -
                  new Date(b.date_closing).getTime()
              )
              .map((draw, index) => {
                return (
                  <Button
                    key={index}
                    variant="outline-dark"
                    onClick={() => navigate("/admin/draw?tag=" + draw.draw_tag)}
                  >
                    <div>{draw.draw_name}</div>
                    <div>{draw.draw_tag}</div>
                  </Button>
                );
              })}
        </div>
        <div>Draws past</div>
        <div className="pb-3 d-flex gap-3" style={{ overflowX: "auto" }}>
          {draws &&
            draws
              .filter(
                (draw) =>
                  new Date(draw.date_closing).getTime() <= new Date().getTime()
              )
              .sort(
                (a, b) =>
                  new Date(b.date_closing).getTime() -
                  new Date(a.date_closing).getTime()
              )
              .map((draw, index) => {
                return (
                  <Button
                    key={index}
                    variant="outline-dark"
                    onClick={() => navigate("/admin/draw?tag=" + draw.draw_tag)}
                  >
                    <div>{draw.draw_name}</div>
                    <div>{draw.draw_tag}</div>
                  </Button>
                );
              })}
        </div>
      </div>
    </AppContainer>
  ) : (
    <AppContainer>
      <div
        className="d-flex flex-column flex-wrap gap-3 p-3 align-items-center align-items-md-start"
        style={{ minHeight: "100vh" }}
      >
        <div className="pt-5">
          We are sorry, you are not authorized to use this page. It would be
          great if you could tell us how you ended up here via the chat!
        </div>
        <Button
          className="border"
          style={{ maxWidth: "250px" }}
          variant="dark"
          onClick={() => navigate("/home")}
        >
          Go Back to the App
        </Button>
      </div>
    </AppContainer>
  );
}
