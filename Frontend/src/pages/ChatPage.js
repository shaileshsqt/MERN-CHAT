import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import Chatbox from "../component/ChatBox";
import MyChats from "../component/MyChats";
import SideDrawer from "../component/Common/SideDrawer.";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Flex d="flex" h="100%" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </div>
  );
};

export default Chatpage;
