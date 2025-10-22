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
        bg="transparent"
        p="3px"
        borderRadius="full"
      >
        <Avatar
          src={user?.user_metadata?.avatar_url}
          size="xs"
          name={userName}
          icon={<IconUserFilled size={18} />}
          bg="transparent"
        />
      </Box>
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          rightIcon={<IconChevronDown size={16} />}
        >
          {userName ?? user?.email}
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => handleNavigate(SETTINGS_PATHS.myProfile)}
            icon={<IconSettings size={18} />}
          >
            Profile settings
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
