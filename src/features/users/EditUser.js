import {
  Button,
  Center,
  Container,
  Grid,
  Group,
  TextInput,
  Title,
  Image,
  LoadingOverlay,
  Text,
  Avatar,
} from "@mantine/core";

import { useForceUpdate, randomId } from "@mantine/hooks";

import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  editUser,
  editUserFromList,
  getUserById,
  getUsersList,
} from "../../store/usersSlice";
// import { store } from "../../store/configureStore";

const schema = z.object({
  name: z.string().min(2, { message: "Your Name - least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z
    .string()
    .min(5, { message: "phone number -  at least 5 digits" }),
  company: z
    .string()
    .min(2, { message: "company name - at least 2 letters" }),
  avatar: z.string().url(),
});

const getRandomKey = (max = 1000) => {
  const randomKey = Math.floor(Math.random() * max);

  return `${randomKey}`;

  // return `https://api.lorem.space/image/face?w=640&h=480&r=${randomKey}`;
};
// console.log("store.getState() :", store.getState());

const EditUser = () => {
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersSlice);

  useEffect(() => {
    // dispatch(getUsersList());
    if (param.id && !users.list.length) navigate("/");
  }, []);

  const [user] = users.list.filter((user) => user.id == param.id);

  // console.log("user :", user);

  // useEffect(() => {
  //   console.log(dispatch(getUserById(param.id)));
  // }, []);

  // const randomAvatarUrl = `https://api.lorem.space/image/face?w=200&h=200`;
  const randomAvatarUrl = `https://source.unsplash.com/random/200x200/?face`;
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.company,
      avatar: `${user.avatar}`,
    },
  });

  const handleEditUser = (values) => {
    const { name, email, phone, company, avatar } = values;

    dispatch(
      editUserFromList({
        id: param.id,
        name,
        email,
        phone,
        company,
        // avatar,
        avatar: `${avatar}`,
      })
    );

    dispatch({
      type: "edit",
      payload: {
        loading: true,
        message: "Working...",
      },
    });
    navigate(-1);
  };

  return (
    <Container>
      <Center>
        <Title order={2}>Edit a Contact:</Title>
      </Center>
      <Center>
        <form
          onSubmit={form.onSubmit((values) => handleEditUser(values))}
        >
          <Grid grow justify='center' align='center'>
            <Grid.Col span={6} align='right'>
              <Image
                radius={100}
                width={100}
                size='md'
                src={form.values.avatar}
              />
            </Grid.Col>
            <Grid.Col span={6} align='left'>
              <Button
                variant='gradient'
                radius='xl'
                size='md'
                gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                onClick={() => {
                  form.setValues({
                    name: form.getInputProps("name").value,
                    email: form.getInputProps("email").value,
                    phone: form.getInputProps("phone").value,
                    company: form.getInputProps("company").value,
                    avatar:
                      randomAvatarUrl + "&r=" + getRandomKey(1000),
                  });

                  // forceUpdate();
                }}
              >
                Generate Avatar
              </Button>
            </Grid.Col>
            <Grid.Col span={12} align='center'>
              <TextInput
                placeholder=''
                mt='xl'
                size='md'
                {...form.getInputProps("avatar")}
              />
            </Grid.Col>
          </Grid>

          <TextInput
            required
            label='Name'
            placeholder='John Doe'
            size='md'
            {...form.getInputProps("name")}
          />
          <TextInput
            label='Email'
            size='md'
            placeholder='example@mail.com'
            {...form.getInputProps("email")}
          />
          <TextInput
            size='md'
            label='Phone'
            placeholder='12345678'
            mt='sm'
            {...form.getInputProps("phone")}
          />
          <TextInput
            size='md'
            label='Company'
            placeholder='Company XYZ'
            mt='sm'
            {...form.getInputProps("company")}
          />

          <Group position='left' mt='xl'>
            <Button type='submit' size='lg'>
              Edit
            </Button>
          </Group>
        </form>
      </Center>
    </Container>
  );
};

export default EditUser;
