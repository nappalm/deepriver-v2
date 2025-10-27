import { SETTINGS_PATHS } from "@/features/settings";
import { useAuthenticatedUser } from "@/shared/hooks";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  IconChevronDown,
  IconSettings,
  IconUserFilled,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const navigate = useNavigate();
  const { user, profile } = useAuthenticatedUser();

  const handleNavigate = (path: string) => navigate(path);

  const userName = profile?.name ?? user?.user_metadata?.name;

  const avatarBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const avatarBorderColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const buttonColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const buttonHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const buttonHoverColor = useColorModeValue("gray.900", "white");
  const buttonActiveBg = useColorModeValue("gray.200", "whiteAlpha.300");
  const menuBg = useColorModeValue("#ffffff", "#0A0A0A");
  const menuBorderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const menuItemBg = useColorModeValue("#ffffff", "#0A0A0A");
  const menuItemColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const menuItemHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const menuItemHoverColor = useColorModeValue("gray.900", "white");

  return (
    <HStack>
      <Box
        bg={avatarBg}
        p="3px"
        borderRadius="full"
        border="1px solid"
        borderColor={avatarBorderColor}
        backdropFilter="blur(10px)"
      >
        <Avatar
          src={user?.user_metadata?.avatar_url}
          size="xs"
          name={userName}
          icon={<IconUserFilled size={18} />}
          bg={avatarBg}
        />
      </Box>
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          rightIcon={<IconChevronDown size={16} />}
          variant="ghost"
          color={buttonColor}
          _hover={{
            bg: buttonHoverBg,
            color: buttonHoverColor,
          }}
          _active={{
            bg: buttonActiveBg,
          }}
        >
          {userName ?? user?.email}
        </MenuButton>
        <MenuList
          bg={menuBg}
          border="1px solid"
          borderColor={menuBorderColor}
          backdropFilter="blur(10px)"
        >
          <MenuItem
            onClick={() => handleNavigate(SETTINGS_PATHS.myProfile)}
            icon={<IconSettings size={18} />}
            bg={menuItemBg}
            color={menuItemColor}
            _hover={{
              bg: menuItemHoverBg,
              color: menuItemHoverColor,
            }}
          >
            Profile settings
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
