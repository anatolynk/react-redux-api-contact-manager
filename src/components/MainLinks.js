import React from "react";
import { Trash, Star, User, Archive, Plus } from "tabler-icons-react";

import {
  ThemeIcon,
  UnstyledButton,
  Group,
  Text,
  Button,
  Divider,
  Anchor,
  Transition,
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

function MainLink({ icon, color, label, url }) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Anchor component={Link} to={url}>
        <Group>
          <ThemeIcon color={color} variant='light'>
            {icon}
          </ThemeIcon>

          <Text size='sm'>{label}</Text>
        </Group>
      </Anchor>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <User size={32} />,
    color: "blue",
    label: "All Contacts",
    url: "/contacts",
  },
  {
    icon: <Star size={32} />,
    color: "yellow",
    label: "Favorites",
    url: "/favorites",
  },
  {
    icon: <Archive size={32} />,
    color: "grape",
    label: "Archive",
    url: "/hidden",
  },
];

export function MainLinks() {
  const links = data.map((link) => (
    <MainLink {...link} key={link.label} to={link.url} />
  ));
  return (
    <div>
      <Link to='/add-user'>
        <div style={{ width: 150 }}>
          <Button
            leftIcon={<Plus />}
            label='Create contact'
            radius='xl'
            size='sm'
            variant='gradient'
            gradient={{ from: "teal", to: "blue", deg: 60 }}
          >
            Create contact
          </Button>
        </div>
      </Link>
      <Divider my='xs' variant='dashed' labelPosition='center' />
      {links}
    </div>
  );
}
