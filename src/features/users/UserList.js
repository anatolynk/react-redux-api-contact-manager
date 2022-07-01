import {
  ActionIcon,
  Avatar,
  Center,
  Container,
  Grid,
  Highlight,
  Loader,
  LoadingOverlay,
  Text,
  ThemeIcon,
  Modal,
  Group,
  Button,
  TypographyStylesProvider,
  Divider,
  Stack,
  MantineProvider,
  Title,
  Table,
  Popover,
  MediaQuery,
  Anchor,
  Transition,
  Notification,
} from "@mantine/core";

import { useModals } from "@mantine/modals";

import {
  showNotification,
  updateNotification,
} from "@mantine/notifications";

import {
  Archive,
  ArchiveOff,
  ArrowsSort,
  Check,
  Code,
  DotsVertical,
  Edit,
  SortAscending,
  SortDescending,
  Star,
  Stars,
  Trash,
  UserCircle,
  CircleX,
} from "tabler-icons-react";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useMatch,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  deleteUser,
  getUsersList,
  addUserToList,
  deleteUserFromList,
  fetchUserById,
  deleteUserById,
  setUserAsToggle,
} from "../../store/usersSlice";

const UserList = () => {
  const getSortedList = (list, sort) => {
    if (sort === "ask")
      return list.list.sort((a, b) => (a.id > b.id ? 1 : -1));
    if (sort === "des")
      return list.list.sort((a, b) => (a.id < b.id ? 1 : -1));
    return list.list.reverse();
  };

  const getFilteredList = (list, pathName) => {
    if (pathName.includes("contacts"))
      return {
        ...list,
        list: list.list.filter((user) => !user?.hidden),
      };

    if (pathName.includes("favorites"))
      return {
        ...list,
        list: list.list.filter(
          (user) => user?.favorite && !user.hidden
        ),
      };

    if (pathName.includes("hidden"))
      return {
        ...list,
        list: list.list.filter((user) => user.hidden),
      };

    return {
      ...list,
      list: list.list.filter((user) => !user?.hidden),
    };
  };
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // if (listParams.sort) {
  //   console.log("SORTING");
  // }
  const [searchParams, setSearchParams] = useSearchParams();

  const users = useSelector((store) =>
    getFilteredList(store.usersSlice, pathname)
  );

  getSortedList(users, searchParams.get("sort"));

  const [modalData, setModalData] = useState({ isOpened: false });
  const [openedPopOver, setOpenedPopOver] = useState(false);

  const [UISpinners, setUISpinners] = useState({ favorite: [{}] });

  const pathNameTitles = {
    contacts: "All Contacts",
    favorites: "Favorites",
    hidden: "Archive",
  };

  useEffect(() => {
    dispatch(getUsersList());
  }, []);

  const getTitleName = (pathName) => {
    if (pathName.includes("contacts")) return pathNameTitles.contacts;
    if (pathName.includes("favorites"))
      return pathNameTitles.favorites;
    if (pathName.includes("hidden")) return pathNameTitles.hidden;
    return pathNameTitles.contacts || "Contacts";
  };

  const handleToggleSort = () => {
    if (searchParams.get("sort") === "ask")
      setSearchParams("sort=des");
    else setSearchParams("sort=ask");
  };

  const handleDeleteUser = (id) => {
    dispatch({
      type: "delete",
      payload: {
        loading: true,
        message: "Working...",
      },
    });
    dispatch(deleteUserFromList(id));
  };

  const handleToggleSetUser = (id, toggleName, toggleStatus) => {
    dispatch({
      type: "toggle",
      payload: {
        loading: true,
        message: "Working...",
      },
    });

    dispatch(setUserAsToggle(id, toggleName, toggleStatus));
  };

  useEffect(() => {
    if (users.notification.loading) {
      showNotification({
        id: "load-data",
        loading: users.notification.loading,
        position: "bottom-center",
        // title: "Loading your data",
        message: users.notification.message || "Working...",
        radius: "lg",
        autoClose: false,
        disallowClose: false,
      });
    }
    if (!users.notification.loading) {
      if (users.notification.message.includes("Error")) {
        updateNotification({
          id: "load-data",
          color: "pink",
          radius: "lg",
          message: users.notification.message || "Error",
          icon: <CircleX />,
          autoClose: 3000,
        });
      } else
        updateNotification({
          id: "load-data",
          color: "teal",
          radius: "lg",
          message: users.notification.message || "Updated",
          icon: <Check />,
          autoClose: 2500,
        });
    }
    return () => {
      // cleanup
    };
  }, [users.notification.loading]);

  const renderContactList = () => {
    //

    return users.list.map((user) => (
      <tr key={`${user.id}${user.name}`}>
        <td>
          <ActionIcon
            variant='hover'
            onClick={() => {
              setUISpinners({
                favorite: [{ id: user.id, isLoading: true }],
              });

              handleToggleSetUser(
                user.id,
                "favorite",
                !user?.favorite
              );
            }}
          >
            {user.favorite ? (
              <AiFillStar size='32' color='#F6B70D' />
            ) : (
              <AiOutlineStar size='32' color='#ccc' />
            )}
          </ActionIcon>
        </td>

        <td>
          <Group>
            <MediaQuery smallerThan='xs' styles={{ display: "none" }}>
              <Link to={`/edit-user/${user.id}`}>
                <Avatar size='md' radius='xl' src={user?.avatar} />
              </Link>
            </MediaQuery>

            <Text>{user.name}</Text>
          </Group>
        </td>

        <MediaQuery smallerThan='md' styles={{ display: "none" }}>
          <td>
            <Text>{user.email}</Text>
          </td>
        </MediaQuery>
        <MediaQuery smallerThan='lg' styles={{ display: "none" }}>
          <td>
            <Text>{user?.phone}</Text>
          </td>
        </MediaQuery>
        <MediaQuery smallerThan='xl' styles={{ display: "none" }}>
          <td>
            <Text>{user?.company}</Text>
          </td>
        </MediaQuery>
        <td>
          <MediaQuery smallerThan='xs' styles={{ display: "none" }}>
            <Group position='center'>
              <ActionIcon color='grape' label='Archive' size='xs'>
                {!user?.hidden ? (
                  <Archive
                    size='18'
                    onClick={() => {
                      handleToggleSetUser(user.id, "hidden", true);
                    }}
                  />
                ) : (
                  <ArchiveOff
                    size='18'
                    onClick={() =>
                      handleToggleSetUser(user.id, "hidden", false)
                    }
                  />
                )}
              </ActionIcon>
              <Link to={`/edit-user/${user.id}`}>
                <ActionIcon color='indigo' size='xs'>
                  <Edit size='18' />
                </ActionIcon>
              </Link>
              <ActionIcon
                color='pink'
                size='xs'
                onClick={() => {
                  setModalData({
                    user: {
                      id: user.id,
                      name: user.name,
                    },
                    isOpened: true,
                  });
                }}
              >
                <Trash size='18' />
              </ActionIcon>
            </Group>
          </MediaQuery>
        </td>
      </tr>
    ));
  };

  return (
    <Container>
      <Title order={1}>{getTitleName(pathname)}</Title>
      {users?.list.length ? (
        <Table
          horizontalSpacing='md'
          verticalSpacing='md'
          highlightOnHover
        >
          <thead>
            <tr>
              <th>
                {/* {users?.list.length > 2 ? ( */}

                {searchParams.get("sort") === "ask" ? (
                  <Button
                    onClick={handleToggleSort}
                    color='gray'
                    variant='default'
                    radius='xl'
                    compact
                    leftIcon={<SortAscending color='gray' />}
                  >
                    Sort
                  </Button>
                ) : (
                  <Button
                    onClick={handleToggleSort}
                    color='gray'
                    variant='default'
                    radius='xl'
                    compact
                    leftIcon={<SortDescending color='gray' />}
                  >
                    Sort
                  </Button>
                )}
              </th>

              <th>Name</th>

              <MediaQuery
                smallerThan='md'
                styles={{ display: "none" }}
              >
                <th>Email</th>
              </MediaQuery>
              <MediaQuery
                smallerThan='lg'
                styles={{ display: "none" }}
              >
                <th>Phone number</th>
              </MediaQuery>
              <MediaQuery
                smallerThan='xl'
                styles={{ display: "none" }}
              >
                <th>Company</th>
              </MediaQuery>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderContactList()}</tbody>
        </Table>
      ) : users.loading ? (
        <LoadingOverlay
          loaderProps={{ size: "lg" }}
          visible={users.loading}
        />
      ) : (
        <Text align='center'>No Contacts</Text>
      )}
      <Center>
        <Modal
          overlayOpacity={0.55}
          overlayBlur={3}
          title='Confirmation:'
          opened={modalData.isOpened}
          onClose={() => setModalData({ isOpened: false })}
        >
          <Text size='md'>
            Are you sure you want to Delete this contact?
          </Text>
          <br />
          <Group position='apart' justify='space-between'>
            <Button
              variant='default'
              color='gray'
              onClick={() => setModalData({ isOpened: false })}
            >
              Cancel
            </Button>
            <Button
              color='indigo'
              onClick={() => {
                handleDeleteUser(modalData?.user?.id);
                setModalData({ isOpened: false });
              }}
            >
              Delete
            </Button>
          </Group>
        </Modal>
      </Center>
    </Container>
  );
};

export default UserList;
