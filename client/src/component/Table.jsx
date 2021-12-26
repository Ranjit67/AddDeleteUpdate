import React from "react";
import MaterialTable from "@material-table/core";
import { useAllUserList } from "hooks";
import { useAppContext } from "contexts";
import { Container } from "@mui/material";

export default function Table() {
  const { userList, setRealtime } = useAllUserList();
  const { snackBarOpen } = useAppContext();
  const createUser = async (newUser) => {
    try {
      const { name, email, phoneNumber } = newUser;
      const response = await fetch("/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setRealtime((prev) => !prev);
        return snackBarOpen(data?.data);
      }
      return snackBarOpen(data?.error?.message, "error");
    } catch (error) {
      new Error(error);
    }
  };
  const updateUser = async (newUser) => {
    try {
      const { name, email, phoneNumber, _id } = newUser;
      const response = await fetch("/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          id: _id,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setRealtime((prev) => !prev);
        return snackBarOpen(data?.data);
      }
      return snackBarOpen(data?.error?.message, "error");
    } catch (error) {
      new Error(error);
    }
  };
  const deleteUser = async (newUser) => {
    try {
      const { _id } = newUser;
      const response = await fetch("/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: _id,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setRealtime((prev) => !prev);
        return snackBarOpen(data?.data);
      }
      return snackBarOpen(data?.error?.message, "error");
    } catch (error) {
      new Error(error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "2rem",
      }}
    >
      <MaterialTable
        columns={[
          { title: "Name", field: "name" },
          { title: "Email", field: "email" },
          { title: "Phone Number", field: "phoneNumber", type: "numeric" },
          {
            title: "Update Count",
            field: "counter",
            type: "numeric",
            editable: "never",
          },
        ]}
        data={userList}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
          pageSize: 10,
        }}
        localization={{
          header: {
            actions: "",
          },
        }}
        editable={{
          onRowAdd: async (data) => {
            await createUser(data);
          },
          onRowUpdate: async (newData, OldData) => {
            await updateUser(newData);
          },
          onRowDelete: async (data) => {
            await deleteUser(data);
          },
        }}
        title="User List"
      />
    </Container>
  );
}
