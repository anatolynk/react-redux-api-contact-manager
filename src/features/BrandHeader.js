import {
  Anchor,
  Center,
  Highlight,
  MediaQuery,
  Text,
} from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "tabler-icons-react";

const BrandHeader = () => {
  return (
    <div>
      <Center>
        <Anchor component={Link} to='/'>
          <MediaQuery smallerThan='xs' styles={{ display: "none" }}>
            <Highlight
              style={{ fontSize: 35 }}
              highlight={["Redux API"]}
              highlightStyles={(theme) => ({
                backgroundImage: theme.fn.linearGradient(
                  45,
                  theme.colors.cyan[5],
                  theme.colors.indigo[5]
                ),
                fontWeight: 900,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              })}
            >
              Redux API: Contact Manager
            </Highlight>
          </MediaQuery>
          <MediaQuery largerThan='xs' styles={{ display: "none" }}>
            <Highlight
              highlight={["Redux API"]}
              size='md'
              highlightStyles={(theme) => ({
                backgroundImage: theme.fn.linearGradient(
                  45,
                  theme.colors.cyan[5],
                  theme.colors.indigo[5]
                ),
                fontWeight: 900,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              })}
            >
              Redux API: Contact Manager
            </Highlight>
          </MediaQuery>
        </Anchor>
      </Center>
    </div>
  );
};

export default BrandHeader;
