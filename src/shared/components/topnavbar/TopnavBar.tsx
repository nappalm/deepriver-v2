import {
  Button,
  ButtonGroup,
  HStack,
} from "@chakra-ui/react";
import {
  IconCalendarFilled,
  IconChartPieFilled,
  IconArticleFilled,
  IconChartAreaFilled,
  IconFolderFilled,
  IconTimelineEventFilled,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../logo";
import ToggleThemeButton from "./ToggleThemeButton";
import UserMenu from "./UserMenu";

export default function Topnavbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      p={3}
      bg="#0A0A0A"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      backdropFilter="blur(10px)"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <HStack>
        <Link to="/">
          <Logo />
        </Link>
        <ButtonGroup spacing="1px" ml={5}>
          <Button
            as={Link}
            to="/feed"
            size="sm"
            leftIcon={<IconArticleFilled size={16} />}
            variant="ghost"
            color={isActive("/feed") ? "white" : "whiteAlpha.700"}
            bg={isActive("/feed") ? "whiteAlpha.200" : "transparent"}
            _hover={{
              bg: "whiteAlpha.200",
              color: "white",
            }}
          >
            Feed
          </Button>
          <Button
            as={Link}
            to="/events"
            size="sm"
            leftIcon={<IconTimelineEventFilled size={16} />}
            variant="ghost"
            color={isActive("/events") ? "white" : "whiteAlpha.700"}
            bg={isActive("/events") ? "whiteAlpha.200" : "transparent"}
            _hover={{
              bg: "whiteAlpha.200",
              color: "white",
            }}
          >
            Events
          </Button>
          <Button
            as={Link}
            to="/analysis"
            size="sm"
            leftIcon={<IconChartPieFilled size={16} />}
            variant="ghost"
            color={isActive("/analysis") ? "white" : "whiteAlpha.700"}
            bg={isActive("/analysis") ? "whiteAlpha.200" : "transparent"}
            _hover={{
              bg: "whiteAlpha.200",
              color: "white",
            }}
          >
            Analysis
          </Button>
          <Button
            as={Link}
            to="/reports"
            size="sm"
            leftIcon={<IconChartAreaFilled size={16} />}
            variant="ghost"
            color={isActive("/reports") ? "white" : "whiteAlpha.700"}
            bg={isActive("/reports") ? "whiteAlpha.200" : "transparent"}
            _hover={{
              bg: "whiteAlpha.200",
              color: "white",
            }}
          >
            Reports
          </Button>
          <Button
            as={Link}
            to="/collections"
            size="sm"
            leftIcon={<IconFolderFilled size={16} />}
            variant="ghost"
            color={isActive("/collections") ? "white" : "whiteAlpha.700"}
            bg={isActive("/collections") ? "whiteAlpha.200" : "transparent"}
            _hover={{
              bg: "whiteAlpha.200",
              color: "white",
            }}
          >
            Collections
          </Button>
        </ButtonGroup>
      </HStack>
      <HStack>
        <ToggleThemeButton />
        <UserMenu />
      </HStack>
    </HStack>
  );
}
