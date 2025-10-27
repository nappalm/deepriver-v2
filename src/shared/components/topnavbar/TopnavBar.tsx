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
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const bg = useColorModeValue("#ffffff", "#0A0A0A");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const activeColor = useColorModeValue("gray.900", "white");
  const inactiveColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const activeBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const hoverBg = useColorModeValue("gray.100", "whiteAlpha.200");

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      p={3}
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
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
            color={isActive("/feed") ? activeColor : inactiveColor}
            bg={isActive("/feed") ? activeBg : "transparent"}
            _hover={{
              bg: hoverBg,
              color: activeColor,
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
            color={isActive("/events") ? activeColor : inactiveColor}
            bg={isActive("/events") ? activeBg : "transparent"}
            _hover={{
              bg: hoverBg,
              color: activeColor,
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
            color={isActive("/analysis") ? activeColor : inactiveColor}
            bg={isActive("/analysis") ? activeBg : "transparent"}
            _hover={{
              bg: hoverBg,
              color: activeColor,
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
            color={isActive("/reports") ? activeColor : inactiveColor}
            bg={isActive("/reports") ? activeBg : "transparent"}
            _hover={{
              bg: hoverBg,
              color: activeColor,
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
            color={isActive("/collections") ? activeColor : inactiveColor}
            bg={isActive("/collections") ? activeBg : "transparent"}
            _hover={{
              bg: hoverBg,
              color: activeColor,
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
