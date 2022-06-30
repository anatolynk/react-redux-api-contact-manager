import {
  Button,
  Center,
  Container,
  Grid,
  Title,
  NumberInput,
  TextInput,
  Box,
  Group,
  Text,
  Avatar,
  Image,
} from "@mantine/core";

import { useForceUpdate, randomId } from "@mantine/hooks";

import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from "../../components/TextField";
import { addUser, addUserToList } from "../../store/usersSlice";
import { Check, FileCheck, FileUpload } from "tabler-icons-react";

const schema = z.object({
  name: z.string().min(2, { message: "Your Name - least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z
    .string()
    .min(5, { message: "phone number -  at least 5 digits" }),
  company: z
    .string()
    .min(2, { message: "company name - at least 2 letters" }),
  avatar: z.string(),
});

const getRandomKey = (max = 1000) => {
  const randomKey = Math.floor(Math.random() * max);

  return `${randomKey}`;

  // return `https://api.lorem.space/image/face?w=640&h=480&r=${randomKey}`;
};

const AddUser = () => {
  // const randomAvatarUrl = `https://api.lorem.space/image/face?w=200&h=200`;
  const randomAvatarUrl = `https://source.unsplash.com/random/200x200/?face`;
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      avatar: `${randomAvatarUrl}&r=${getRandomKey(1000)}`,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forceUpdate = useForceUpdate();

  // const randomAvatarUrl = getRandomAvatarUrl();

  const handleAddUser = (values) => {
    const { name, email, phone, company, avatar } = values;
    dispatch({
      type: "add",
      payload: {
        loading: true,
        message: "Working...",
      },
    });

    dispatch(
      addUserToList({
        name,
        email,
        phone,
        company,
        // avatar,
        avatar: `${avatar}`,
      })
    );

    navigate("/");
  };
  return (
    <Container>
      <Center>
        <Title order={2}>Create a Contact:</Title>
      </Center>
      <Center>
        <form
          onSubmit={form.onSubmit((values) => handleAddUser(values))}
        >
          <Grid grow justify='center' align='center'>
            <Grid.Col span={6} align='right'>
              <Image
                radius={100}
                width={100}
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
            mt='sm'
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
              Save
            </Button>
          </Group>
        </form>
      </Center>
    </Container>
  );
};

export default AddUser;
