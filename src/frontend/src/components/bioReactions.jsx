import React from "react";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import Data from "../assets/reactions.json";

export class bioReactions extends React.Component {
  render() {
    return (
      <Container style={{ marginTop: "5%", marginBottom: "10%" }}>
        <MaterialTable
          title="Biotransformation Reactions"
          columns={[
            { title: "ID", field: "ID", type: "numeric" },
            { title: "Formula Change", field: "Formula change" },
            { title: "Heavy Atom #", field: "Heavy atom #", type: "numeric" },
            { title: "Reaction", field: "Reaction" },
            {
              title: "Mass Difference",
              field: "Mass difference",
              type: "numeric",
            },
            { title: "Description", field: "Description" },
          ]}
          data={Data}
          options={{
            headerStyle: {
              backgroundColor: "#98B2C3",
              color: "#FFF",
              textAlign: "left",
            },
            maxBodyHeight: "100vh",
            cellStyle: {
              textAlign: "left",
            },
            selection: false,
            paging: false,
            padding: "dense",
            doubleHorizontalScroll: true,
          }}
        />
      </Container>
    );
  }
}

export default bioReactions;
