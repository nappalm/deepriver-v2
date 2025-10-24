import {
  Button,
  ButtonGroup,
  HStack,
  useColorModeValue,
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
  const bg = useColorModeValue("transparent", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      p={3}
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
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
            variant={isActive("/feed") ? "solid" : "ghost"}
          >
            Feed
          </Button>
          <Button
            as={Link}
            to="/events"
            size="sm"
            leftIcon={<IconTimelineEventFilled size={16} />}
            variant={isActive("/events") ? "solid" : "ghost"}
          >
            Events
          </Button>
          <Button
            as={Link}
            to="/analysis"
            size="sm"
            leftIcon={<IconChartPieFilled size={16} />}
            variant="solid"
            colorScheme="blue"
          >
            Analysis
          </Button>
          <Button
            as={Link}
            to="/reports"
            size="sm"
            leftIcon={<IconChartAreaFilled size={16} />}
            variant={isActive("/reports") ? "solid" : "ghost"}
          >
            Reports
          </Button>
          <Button
            as={Link}
            to="/collections"
            size="sm"
            leftIcon={<IconFolderFilled size={16} />}
            variant={isActive("/collections") ? "solid" : "ghost"}
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
