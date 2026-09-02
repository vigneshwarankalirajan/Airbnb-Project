import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import useLoginModal from "./hooks/useLoginModal";
import useRegisterModal from "./hooks/useRegisterModal";
import useRentModal from "./hooks/useRentModal";

import MenuItem from "./MenuItem";
import Avatar from "./Avatar";
import logger from "../lib/logger";

const UserMenu = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);

    logger.info("User menu toggled", {
      isOpen: !isOpen,
    });
  }, [isOpen]);

  const onRent = useCallback(() => {
    logger.info("Airbnb your home clicked", {
      isAuthenticated: !!currentUser,
    });

    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  const handleNavigation = (path) => {
    logger.info("Navigation clicked", {
      path,
    });

    window.location.href = path;
  };

  const handleLogout = () => {
    logger.info("Logout clicked");

    // Replace this with your FastAPI logout API later
    localStorage.removeItem("access_token");

    window.location.href = "/";
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">

        {/* Airbnb your home */}
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Airbnb your home
        </div>

        {/* Menu button */}
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />

          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">

            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() =>
                    handleNavigation("/trips")
                  }
                />

                <MenuItem
                  label="My favorites"
                  onClick={() =>
                    handleNavigation("/favorites")
                  }
                />

                <MenuItem
                  label="My reservations"
                  onClick={() =>
                    handleNavigation("/reservations")
                  }
                />

                <MenuItem
                  label="My properties"
                  onClick={() =>
                    handleNavigation("/properties")
                  }
                />

                <MenuItem
                  label="Airbnb your home"
                  onClick={() =>
                    rentModal.onOpen()
                  }
                />

                <hr />

                <MenuItem
                  label="Logout"
                  onClick={handleLogout}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    logger.info("Login clicked");
                    loginModal.onOpen();
                  }}
                />

                <MenuItem
                  label="Sign up"
                  onClick={() => {
                    logger.info("Sign up clicked");
                    registerModal.onOpen();
                  }}
                />
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;