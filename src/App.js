import {
  AppShell,
  Navbar,
  Header,
  Center,
  Highlight,
  TypographyStylesProvider,
  MantineProvider,
  Text,
  Footer,
  Aside,
  MediaQuery,
  Burger,
  useMantineTheme,
  Blockquote,
} from "@mantine/core";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { MainLinks } from "./components/MainLinks";
import BrandHeader from "./features/BrandHeader";
import AddUser from "./features/users/AddUser";
import EditUser from "./features/users/EditUser";

import UserList from "./features/users/UserList";
import { addUser, deleteUser } from "./store/usersSlice";

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint='sm'
        asideOffsetBreakpoint='sm'
        fixed
        navbar={
          <Navbar
            p='md'
            hiddenBreakpoint='sm'
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <MainLinks />
          </Navbar>
        }
        // aside={
        //   <MediaQuery smallerThan='sm' styles={{ display: "none" }}>
        //     <Aside
        //       p='md'
        //       hiddenBreakpoint='sm'
        //       width={{ sm: 200, lg: 300 }}
        //     >
        //       <Text>Contact Info:</Text>
        //     </Aside>
        //   </MediaQuery>
        // }
        footer={
          <MediaQuery smallerThan='xl' styles={{ display: "none" }}>
            <Footer height={50} p='sm'>
              <Text color='dimmed' align='center' size='md'>
                Project: React, Redux, Rest API - Anatoly Nikulyak,
                Contact: https://github.com/anatolynk
              </Text>
            </Footer>
          </MediaQuery>
        }
        header={
          <Header height={70} p='md'>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <MediaQuery
                largerThan='sm'
                styles={{ display: "none" }}
              >
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size='sm'
                  color={theme.colors.gray[6]}
                  mr='xl'
                />
              </MediaQuery>

              <Text size='xs'>
                <BrandHeader />
              </Text>
            </div>
          </Header>
        }
      >
        <Routes>
          <Route path='/' element={<UserList />}></Route>
          <Route path='/contacts' element={<UserList />}></Route>
          <Route path='/favorites' element={<UserList />}></Route>
          <Route path='/hidden' element={<UserList />}></Route>
          <Route path='/add-user' element={<AddUser />}></Route>
          <Route path='/edit-user/:id' element={<EditUser />}></Route>
          <Route path='*' element={<Navigate to='/' />}></Route>
        </Routes>
      </AppShell>
    </div>
  );
}

export default App;
