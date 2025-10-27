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

  return (
    <HStack>
      <Box
        bg="whiteAlpha.200"
        p="3px"
        borderRadius="full"
        border="1px solid"
        borderColor="whiteAlpha.300"
        backdropFilter="blur(10px)"
      >
        <Avatar
          src={user?.user_metadata?.avatar_url}
          size="xs"
          name={userName}
          icon={<IconUserFilled size={18} />}
          bg="whiteAlpha.200"
        />
      </Box>
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          rightIcon={<IconChevronDown size={16} />}
          variant="ghost"
          color="whiteAlpha.700"
          _hover={{
            bg: "whiteAlpha.200",
            color: "white",
          }}
          _active={{
            bg: "whiteAlpha.300",
          }}
        >
          {userName ?? user?.email}
        </MenuButton>
        <MenuList
          bg="#000"
          border="1px solid"
          borderColor="whiteAlpha.200"
          backdropFilter="blur(10px)"
        >
          <MenuItem
            onClick={() => handleNavigate(SETTINGS_PATHS.myProfile)}
            icon={<IconSettings size={18} />}
            bg="#000"
            color="whiteAlpha.700"
            _hover={{
              bg: "whiteAlpha.200",
              color: "white",
            }}
          >
            Profile settings
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
