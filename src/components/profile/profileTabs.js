"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Paper } from "@mui/material";
import UpdateTab from "./tabs/updateTab";
import MyPostsTab from "./tabs/MyPostsTab";

export default function ProfileTabs({ data, user }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Bilgilerini Güncelle" value="1" />
            <Tab label="Profil Fotoğrafını Değiştir" value="2" />
            <Tab label="Yazılarım" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <UpdateTab data={data} user={user} />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">
          <MyPostsTab />
        </TabPanel>
      </TabContext>
    </Paper>
  );
}
