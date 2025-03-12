// // import React, { useState } from "react";
// // import SockJS from "sockjs-client";
// // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";

// // var stopmClient = null;

// // const Chatroom = () => {
// //   const [userData, setUserData] = useState({
// //     username: "",
// //     receiverName: "",
// //     connected: false,
// //     message: "",
// //   });
// //   const [publicChats, setPublicChats] = useState([]);
// //   const [privateChats, setPrivateChats] = useState(new Map());
// //   const [tab, setTab] = useState("CHATROOM");

// //   const registerUser = () => {
// //     let Sock = new SockJS("http://localhost:2024/ws");
// //     stopmClient.connect({}, ongamepadconnected, onError);
// //   };

// //   const onConnected = (e) => {
// //     setUserData({ ...userData, connected: true });
// //     stopmClient.subscribe("/chatroom/public", onPublicMessageReceived);
// //     stopmClient.subscribe(
// //       "/user/" + userData.username + "/private",
// //       onPrivateMessageRecieved
// //     );
// //   };

// //   const userJoin = () => {
// //     let chatMessage = {
// //       senderName: userData.username,
// //       status: "JOIN",
// //     };
// //     stopmClient.send("/app/message", {}, JSON.stringify(chatMessage));
// //   };

// //   const onPublicMessageReceived = (payload) => {
// //     let payloadData = JSON.parse(payload.body);
// //     switch (payloadData.status) {
// //       case "JOIN":
// //         if (!privateChats.get(payloadData.senderName)) {
// //           privateChats.get(payloadData.senderName, []);
// //           setPrivateChats(new Map(privateChats));
// //         }
// //         break;
// //       case "MESSAGE":
// //         setPublicChats([...publicChats, payloadData]);
// //         break;
// //       default:
// //         break;
// //     }
// //   };

// //   const onPrivateMessageRecieved = (payload) => {
// //     let payloadData = JSON.parse(payload.body);
// //     if (privateChats.get(payloadData.senderName)) {
// //       privateChats.get(payloadData.senderName).push(payloadData);
// //       setPrivateChats(new Map(privateChats));
// //     } else {
// //       list.push(payloadData);
// //       privateChats.get(payloadData.senderName, []);
// //       setPrivateChats(new Map(privateChats));
// //     }
// //   };

// //   const handleValue = (e) => {
// //     setUserData((prevUserData) => ({
// //       ...prevUserData,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const onError = (err) => {
// //     console.log(err);
// //   };

// //   const sendPublicMessage = () => {
// //     if (stopmClient) {
// //       let chatMessage = {
// //         senderName: userData.username,
// //         message: userData.message,
// //         status: "MESSAGE",
// //       };
// //       stopmClient.send("/app/message", {}, JSON.stringify(chatMessage));
// //       setUserData({ ...userData, message: "" });
// //     }
// //   };

// //   const sendPrivateMessage = () => {
// //     if (stopmClient) {
// //       let chatMessage = {
// //         senderName: userData.username,
// //         receiverName: userData.receiverName,
// //         message: userData.message,
// //         status: "MESSAGE",
// //       };

// //       if (userData.username !== tab) {
// //         privateChats.set(tab).push(chatMessage);
// //         setPrivateChats(new Map(privateChats));
// //       }
// //       stopmClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
// //       setUserData({ ...userData, message: "" });
// //     }
// //   };

// //   return (
// //     <div>
// //       {userData.connected ? (
// //         <div className="border p-4">
// //           <div className="border">
// //             <ul>
// //               <li
// //                 onClick={() => {
// //                   setTab("CHATROOM");
// //                 }}
// //                 className=" border"
// //               >
// //                 ChatRoom
// //               </li>
// //               {[...privateChats.keys()].map((name, idx) => (
// //                 <li className="member border" onClick={setTab(name)} key={idx}>
// //                   {name}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //           {tab === "CHATROOM" && (
// //             <div className="border">
// //               <ul className="chat-meesages">
// //                 {publicChats.map((chat, idx) => {
// //                   <li className="message" key={idx}>
// //                     {chat.senderName !== userData.username && (
// //                       <Avatar>
// //                         <AvatarFallback>{userData.username[0]}</AvatarFallback>
// //                       </Avatar>
// //                     )}
// //                     <div className="message-data">{chat.message}</div>
// //                     {chat.senderName !== userData.username && (
// //                       <Avatar>
// //                         <AvatarFallback>{userData.username[0]}</AvatarFallback>
// //                       </Avatar>
// //                     )}
// //                   </li>;
// //                 })}
// //               </ul>
// //               <div className="send-messages">
// //                 <Input
// //                   type={"text"}
// //                   placeholder="Enter meesage"
// //                   name="message"
// //                   value={userData.message}
// //                   onChange={handleValue}
// //                 />
// //                 <Button onClick={sendPublicMessage}>Send</Button>
// //               </div>
// //             </div>
// //           )}
// //           {tab !== "CHATROOM" && (
// //             <div className="border">
// //               <ul>
// //                 {[...privateChats.get(tab)].map((chat, idx) => {
// //                   <li className="message" key={idx}>
// //                     {chat.senderName !== userData.username && (
// //                       <Avatar>
// //                         <AvatarFallback>{userData.username[0]}</AvatarFallback>
// //                       </Avatar>
// //                     )}
// //                     <div className="message-data">{chat.message}</div>
// //                     {chat.senderName !== userData.username && (
// //                       <Avatar>
// //                         <AvatarFallback>{userData.username[0]}</AvatarFallback>
// //                       </Avatar>
// //                     )}
// //                   </li>;
// //                 })}
// //               </ul>
// //               <div className="send-messages">
// //                 <Input
// //                   type={"text"}
// //                   name="message"
// //                   placeholder={`Enter message for ${tab}`}
// //                   value={userData.message}
// //                   onChange={handleValue}
// //                 />
// //                 <Button onClick={sendPrivateMessage}>Send</Button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       ) : (
// //         <div>
// //           <input
// //             id="user-name"
// //             name="username"
// //             placeholder="Enter the user name"
// //             value={userData.username}
// //             onChange={handleValue}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Chatroom;

// import React, { useState } from "react";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// var stompClient = null;

// const Chatroom = () => {
//   const [userData, setUserData] = useState({
//     userId: Math.floor(Math.random() * 10000), // Random user ID
//     username: "",
//     receiverId: null,
//     receiverName: "",
//     connected: false,
//     message: "",
//   });

//   const [publicChats, setPublicChats] = useState([]);
//   const [privateChats, setPrivateChats] = useState(new Map());
//   const [tab, setTab] = useState("CHATROOM");

//   const registerUser = () => {
//     let Sock = new SockJS("http://localhost:2024/ws");
//     stompClient = Stomp.over(Sock);
//     stompClient.connect({}, onConnected, onError);
//   };

//   const onConnected = () => {
//     setUserData((prev) => ({ ...prev, connected: true }));
//     stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
//     stompClient.subscribe(
//       `/user/${userData.userId}/private`,
//       onPrivateMessageReceived
//     );
//     userJoin();
//   };

//   const userJoin = () => {
//     let chatMessage = {
//       senderId: userData.userId,
//       senderName: userData.username,
//       status: "JOIN",
//     };
//     stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//   };

//   const onPublicMessageReceived = (payload) => {
//     let payloadData = JSON.parse(payload.body);

//     if (payloadData.status === "MESSAGE") {
//       setPublicChats((prevChats) => [...prevChats, payloadData]);
//     } else if (payloadData.status === "JOIN") {
//       // Add new user to private chats list
//       setPrivateChats((prevChats) => {
//         const updatedChats = new Map(prevChats);
//         if (!updatedChats.has(payloadData.senderName)) {
//           updatedChats.set(payloadData.senderName, {
//             id: payloadData.senderId,
//             messages: [],
//           });
//         }
//         return new Map(updatedChats);
//       });
//     }
//   };

//   const onPrivateMessageReceived = (payload) => {
//     let payloadData = JSON.parse(payload.body);

//     setPrivateChats((prevChats) => {
//       const updatedChats = new Map(prevChats);
//       if (!updatedChats.has(payloadData.senderName)) {
//         updatedChats.set(payloadData.senderName, {
//           id: payloadData.senderId,
//           messages: [],
//         });
//       }
//       updatedChats.get(payloadData.senderName).messages.push(payloadData);
//       return new Map(updatedChats);
//     });
//   };

//   const handleValue = (e) => {
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onError = (err) => {
//     console.error("WebSocket Error: ", err);
//   };

//   const sendPublicMessage = () => {
//     if (stompClient && userData.message.trim() !== "") {
//       let chatMessage = {
//         senderId: userData.userId,
//         senderName: userData.username,
//         content: userData.message,
//         status: "MESSAGE",
//         createdAt: new Date().toISOString(),
//       };

//       stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//       setUserData((prev) => ({ ...prev, message: "" }));
//     }
//   };

//   const sendPrivateMessage = () => {
//     if (stompClient && userData.message.trim() !== "") {
//       let chatMessage = {
//         senderId: userData.userId,
//         senderName: userData.username,
//         receiverId: privateChats.get(tab).id, // Fetch receiver's ID
//         receiverName: tab,
//         content: userData.message,
//         status: "MESSAGE",
//       };

//       setPrivateChats((prevChats) => {
//         const updatedChats = new Map(prevChats);
//         updatedChats.get(tab).messages.push(chatMessage);
//         return new Map(updatedChats);
//       });

//       stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
//       setUserData((prev) => ({ ...prev, message: "" }));
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
//       {userData.connected ? (
//         <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="flex">
//             {/* Chat Sidebar */}
//             <div className="w-1/4 bg-blue-600 text-white p-3">
//               <ul>
//                 <li
//                   onClick={() => setTab("CHATROOM")}
//                   className={`cursor-pointer p-2 rounded-md ${
//                     tab === "CHATROOM" ? "bg-blue-800" : ""
//                   }`}
//                 >
//                   ChatRoom
//                 </li>
//                 {[...privateChats.keys()].map((name, idx) => (
//                   <li
//                     key={idx}
//                     onClick={() => setTab(name)}
//                     className={`cursor-pointer p-2 rounded-md ${
//                       tab === name ? "bg-blue-800" : ""
//                     }`}
//                   >
//                     {name}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Chat Window */}
//             <div className="w-3/4 flex flex-col h-[500px]">
//               <div className="p-4 flex-1 overflow-y-auto bg-gray-50">
//                 {tab === "CHATROOM" ? (
//                   <ul>
//                     {publicChats.map((chat, idx) => (
//                       <li
//                         key={idx}
//                         className={`flex ${
//                           chat.senderName === userData.username
//                             ? "justify-end"
//                             : "justify-start"
//                         } mb-2`}
//                       >
//                         {chat.senderName !== userData.username && (
//                           <Avatar>
//                             <AvatarFallback>
//                               {chat.senderName[0]}
//                             </AvatarFallback>
//                           </Avatar>
//                         )}
//                         <div
//                           className={`p-2 rounded-lg ${
//                             chat.senderName === userData.username
//                               ? "bg-blue-500 text-white"
//                               : "bg-gray-300 text-black"
//                           }`}
//                         >
//                           {chat.content}
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <ul>
//                     {privateChats.get(tab)?.messages.map((chat, idx) => (
//                       <li
//                         key={idx}
//                         className={`flex ${
//                           chat.senderName === userData.username
//                             ? "justify-end"
//                             : "justify-start"
//                         } mb-2`}
//                       >
//                         {chat.senderName !== userData.username && (
//                           <Avatar>
//                             <AvatarFallback>
//                               {chat.senderName[0]}
//                             </AvatarFallback>
//                           </Avatar>
//                         )}
//                         <div
//                           className={`p-2 rounded-lg ${
//                             chat.senderName === userData.username
//                               ? "bg-blue-500 text-white"
//                               : "bg-gray-300 text-black"
//                           }`}
//                         >
//                           {chat.content}
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>

//               {/* Input Field */}
//               <div className="flex items-center p-3 bg-white border-t">
//                 <Input
//                   type="text"
//                   name="message"
//                   placeholder={`Enter message for ${tab}`}
//                   value={userData.message}
//                   onChange={handleValue}
//                   className="flex-1 p-2 border rounded-md"
//                 />
//                 <Button
//                   onClick={
//                     tab === "CHATROOM" ? sendPublicMessage : sendPrivateMessage
//                   }
//                   className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Send
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//           <h2 className="text-lg font-semibold text-center mb-4">
//             Enter Your Username
//           </h2>
//           <Input
//             name="username"
//             placeholder="Username"
//             value={userData.username}
//             onChange={handleValue}
//             className="w-full p-2 border rounded-md"
//           />
//           <Button
//             onClick={registerUser}
//             className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md"
//           >
//             Join Chat
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatroom;

// import React, { useEffect, useState, useRef } from "react";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchProjectById } from "@/redux/project/Action";
// import axios from "axios";

// const Chatroom = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams(); // Project/Team ID
//   const { auth, project } = useSelector((store) => store);
//   const messageEndRef = useRef(null);

//   const [stompClient, setStompClient] = useState(null);
//   const [publicChats, setPublicChats] = useState([]);
//   const [privateChats, setPrivateChats] = useState(new Map());
//   const [currentReceiver, setCurrentReceiver] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     dispatch(fetchProjectById(id));
//     fetchPreviousMessages();
//     fetchPrivateMessages();
//     connectWebSocket();
//   }, [id, dispatch]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [publicChats, privateChats]);

//   // ✅ Fetch previous public messages
//   const fetchPreviousMessages = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:2024/chat/team/${id}/messages`
//       );
//       setPublicChats(response.data);
//     } catch (error) {
//       console.error("Error fetching public messages:", error);
//     }
//   };

//   // ✅ Fetch previous private messages
//   const fetchPrivateMessages = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:2024/chat/messages/${auth.user.id}`
//       );
//       const privateMessages = response.data;
//       const tempChats = new Map();
//       privateMessages.forEach((msg) => {
//         if (!tempChats.has(msg.senderId)) {
//           tempChats.set(msg.senderId, { name: msg.senderName, messages: [] });
//         }
//         tempChats.get(msg.senderId).messages.push(msg);
//       });
//       setPrivateChats(tempChats);
//     } catch (error) {
//       console.error("Error fetching private messages:", error);
//     }
//   };

//   // ✅ Connect WebSocket and auto-reconnect if disconnected
//   const connectWebSocket = () => {
//     let socket = new SockJS("http://localhost:2024/ws");
//     let stomp = Stomp.over(socket);

//     stomp.connect({}, () => {
//       setStompClient(stomp);
//       stomp.subscribe(`/team/${id}/chat`, onPublicMessageReceived);
//       stomp.subscribe(
//         `/user/${auth.user.id}/private`,
//         onPrivateMessageReceived
//       );
//     });

//     stomp.onclose = () => {
//       console.log("WebSocket disconnected. Reconnecting...");
//       setTimeout(connectWebSocket, 3000);
//     };
//   };

//   // ✅ Handle received public messages
//   const onPublicMessageReceived = (payload) => {
//     let messageData = JSON.parse(payload.body);
//     setPublicChats((prevChats) => [...prevChats, messageData]); // Update state
//   };

//   // ✅ Handle received private messages
//   const onPrivateMessageReceived = (payload) => {
//     let messageData = JSON.parse(payload.body);
//     setPrivateChats((prevChats) => {
//       const updatedChats = new Map(prevChats);
//       if (!updatedChats.has(messageData.senderId)) {
//         updatedChats.set(messageData.senderId, {
//           name: messageData.senderName,
//           messages: [],
//         });
//       }
//       updatedChats.get(messageData.senderId).messages.push(messageData);
//       return new Map(updatedChats);
//     });
//   };

//   // ✅ Send messages (public or private)
//   const handleSendMessage = () => {
//     if (!stompClient || message.trim() === "") return;

//     const isTeamMember = project?.projectDetails?.team?.some(
//       (member) => member.id === auth.user.id
//     );
//     if (!isTeamMember) {
//       alert("You are not a member of this project.");
//       return;
//     }

//     let chatMessage = {
//       senderId: auth.user.id,
//       senderName: auth.user.fullName,
//       receiverId: currentReceiver ? currentReceiver.id : null,
//       receiverName: currentReceiver ? currentReceiver.fullName : null,
//       projectId: id,
//       content: message,
//       createdAt: new Date().toISOString(),
//     };

//     if (currentReceiver) {
//       stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
//       setPrivateChats((prevChats) => {
//         const updatedChats = new Map(prevChats);
//         if (!updatedChats.has(currentReceiver.id)) {
//           updatedChats.set(currentReceiver.id, {
//             name: currentReceiver.fullName,
//             messages: [],
//           });
//         }
//         updatedChats.get(currentReceiver.id).messages.push(chatMessage);
//         return new Map(updatedChats);
//       });
//     } else {
//       stompClient.send(`/app/team/${id}/chat`, {}, JSON.stringify(chatMessage));
//     }

//     setMessage("");
//   };

//   // ✅ Scroll chat to bottom on new messages
//   const scrollToBottom = () => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
//       {project?.projectDetails && (
//         <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
//           {/* 🔹 Chat Header */}
//           <div className="bg-blue-600 text-white p-3 text-center font-bold">
//             Chatroom - {project.projectDetails.name}
//           </div>

//           <div className="flex flex-col md:flex-row">
//             {/* 🔹 Chat Sidebar */}
//             <div className="w-full md:w-1/4 bg-blue-600 text-white p-3">
//               <h3 className="font-bold mb-2">Team Members</h3>
//               <ul>
//                 <li
//                   className={`p-2 rounded-md cursor-pointer ${
//                     !currentReceiver ? "bg-blue-800" : ""
//                   }`}
//                   onClick={() => setCurrentReceiver(null)}
//                 >
//                   Group Chat (Team)
//                 </li>
//                 {project?.projectDetails?.team?.map(
//                   (member) =>
//                     auth.user.id !== member.id && (
//                       <li
//                         key={member.id}
//                         className={`p-2 rounded-md cursor-pointer ${
//                           currentReceiver?.id === member.id ? "bg-blue-800" : ""
//                         }`}
//                         onClick={() => setCurrentReceiver(member)}
//                       >
//                         {member.fullName}
//                       </li>
//                     )
//                 )}
//               </ul>
//             </div>

//             {/* 🔹 Chat Window */}
//             <div className="w-full md:w-3/4 flex flex-col h-[500px]">
//               <div className="p-4 flex-1 overflow-y-auto bg-gray-50">
//                 <ul>
//                   {(currentReceiver
//                     ? privateChats.get(currentReceiver.id)?.messages
//                     : publicChats
//                   )?.map((chat, idx) => (
//                     <li key={idx} className="mb-2 flex">
//                       <div className="p-2 bg-gray-300 text-black rounded-lg ml-2">
//                         <span className="font-bold">{chat.senderName}: </span>{" "}
//                         {chat.content}
//                         <div className="text-xs text-gray-600">
//                           {new Date(chat.createdAt).toLocaleTimeString()}
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                   <div ref={messageEndRef} />
//                 </ul>
//               </div>

//               {/* 🔹 Message Input */}
//               <div className="p-3 bg-white flex items-center border-t">
//                 <textarea
//                   className="flex-1 p-2 border rounded-md resize-none focus:outline-none"
//                   rows="2"
//                   placeholder="Type a message..."
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={(e) =>
//                     e.key === "Enter" && !e.shiftKey && handleSendMessage()
//                   }
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatroom;

import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "@/redux/project/Action";
import axios from "axios";

const Chatroom = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Project ID
  const { auth, project } = useSelector((store) => store);
  const messageEndRef = useRef(null);

  const [stompClient, setStompClient] = useState(null);
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [currentReceiver, setCurrentReceiver] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchProjectById(id));
    fetchPreviousMessages();
    fetchPrivateMessages();
    connectWebSocket();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [id]);

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [publicChats, privateChats]);

  // Fetch previous public messages
  const fetchPreviousMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2024/chat/team/${id}/messages`
      );
      setPublicChats(response.data);
    } catch (error) {
      console.error("Error fetching public messages:", error);
    }
  };

  // Fetch previous private messages
  const fetchPrivateMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2024/chat/messages/${auth.user.id}/${id}`
      );
      const privateMessages = response.data;
      const tempChats = new Map();

      privateMessages.forEach((msg) => {
        // Identify the chat partner (not the current user)
        const chatPartnerId =
          msg.senderId === auth.user.id ? msg.receiverId : msg.senderId;
        const chatPartnerName =
          msg.senderId === auth.user.id ? msg.receiverName : msg.senderName;

        // Initialize chat history if not present
        if (!tempChats.has(chatPartnerId)) {
          tempChats.set(chatPartnerId, { name: chatPartnerName, messages: [] });
        }

        // Push the message to the correct chat partner
        tempChats.get(chatPartnerId).messages.push(msg);
      });

      setPrivateChats(tempChats);
    } catch (error) {
      console.error("Error fetching private messages:", error);
    }
  };

  const handleSendMessage = () => {
    if (!stompClient || message.trim() === "") return;

    const isTeamMember = project?.projectDetails?.team?.some(
      (member) => member.id === auth.user.id
    );
    if (!isTeamMember) {
      alert("You are not a member of this project.");
      return;
    }

    let chatMessage = {
      senderId: auth.user.id,
      senderName: auth.user.fullName,
      receiverId: currentReceiver ? currentReceiver.id : null,
      receiverName: currentReceiver ? currentReceiver.fullName : null,
      projectId: id,
      content: message,
      createdAt: new Date().toISOString(),
    };

    if (currentReceiver) {
      // 🔹 Send private message via WebSocket
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));

      // 🔹 Update sender’s own chat manually
      setPrivateChats((prevChats) => {
        const updatedChats = new Map(prevChats);

        // Identify the chat partner
        const chatPartnerId = currentReceiver.id;

        if (!updatedChats.has(chatPartnerId)) {
          updatedChats.set(chatPartnerId, {
            name: currentReceiver.fullName,
            messages: [],
          });
        }

        // Push the new message to the chat window
        updatedChats.get(chatPartnerId).messages.push(chatMessage);

        return new Map(updatedChats);
      });
    } else {
      // 🔹 Send public message via WebSocket
      chatMessage.receiverId = null;
      stompClient.send(`/app/team/${id}/chat`, {}, JSON.stringify(chatMessage));
    }

    setMessage(""); // Clear input after sending
  };

  // Connect to WebSocket
  const connectWebSocket = () => {
    if (stompClient) return; // Prevent duplicate connections

    let socket = new SockJS("http://localhost:2024/ws");
    let stomp = Stomp.over(socket);

    stomp.connect({}, () => {
      setStompClient(stomp);

      // Subscribe to public chat
      stomp.subscribe(`/team/${id}/chat`, (payload) => {
        let messageData = JSON.parse(payload.body);
        setPublicChats((prevChats) => {
          if (!prevChats.some((msg) => msg.id === messageData.id)) {
            return [...prevChats, messageData];
          }
          return prevChats;
        });
      });

      // Subscribe to private chat
      stomp.subscribe(`/user/${auth.user.id}/private`, (payload) => {
        let messageData = JSON.parse(payload.body);
        setPrivateChats((prevChats) => {
          const updatedChats = new Map(prevChats);
          if (!updatedChats.has(messageData.senderId)) {
            updatedChats.set(messageData.senderId, {
              name: messageData.senderName,
              messages: [],
            });
          }
          updatedChats.get(messageData.senderId).messages.push(messageData);
          return new Map(updatedChats);
        });
      });
    });

    stomp.onclose = () => {
      console.log("WebSocket disconnected. Reconnecting...");
      setTimeout(connectWebSocket, 3000);
    };
  };

  // Send messages (public or private)
  // const handleSendMessage = () => {
  //   if (!stompClient || message.trim() === "") return;

  //   const isTeamMember = project?.projectDetails?.team?.some(
  //     (member) => member.id === auth.user.id
  //   );
  //   if (!isTeamMember) {
  //     alert("You are not a member of this project.");
  //     return;
  //   }

  //   let chatMessage = {
  //     senderId: auth.user.id,
  //     senderName: auth.user.fullName,
  //     receiverId: currentReceiver ? currentReceiver.id : null,
  //     receiverName: currentReceiver ? currentReceiver.fullName : null,
  //     projectId: id,
  //     content: message,
  //     createdAt: new Date().toISOString(),
  //   };

  //   if (currentReceiver) {
  //     stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
  //   } else {
  //     stompClient.send(`/app/team/${id}/chat`, {}, JSON.stringify(chatMessage));
  //   }

  //   setMessage("");
  // };

  // Scroll chat to bottom
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      {project?.projectDetails && (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-3 text-center font-bold">
            Chatroom - {project.projectDetails.name}
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Chat Sidebar */}
            <div className="w-full md:w-1/4 bg-blue-600 text-white p-3">
              <h3 className="font-bold mb-2">Team Members</h3>
              <ul>
                <li
                  className={`p-2 rounded-md cursor-pointer ${
                    !currentReceiver ? "bg-blue-800" : ""
                  }`}
                  onClick={() => setCurrentReceiver(null)}
                >
                  Group Chat (Team)
                </li>
                {project?.projectDetails?.team?.map(
                  (member) =>
                    auth.user.id !== member.id && (
                      <li
                        key={member.id}
                        className={`p-2 rounded-md cursor-pointer ${
                          currentReceiver?.id === member.id ? "bg-blue-800" : ""
                        }`}
                        onClick={() => setCurrentReceiver(member)}
                      >
                        {member.fullName}
                      </li>
                    )
                )}
              </ul>
            </div>

            {/* Chat Window */}
            <div className="w-full md:w-3/4 flex flex-col h-[500px]">
              <div className="p-4 flex-1 overflow-y-auto bg-gray-50">
                <ul>
                  {(currentReceiver
                    ? privateChats.get(currentReceiver.id)?.messages
                    : publicChats
                  )?.map((chat, idx) => (
                    <li key={idx} className="mb-2 flex">
                      <div className="p-2 bg-gray-300 text-black rounded-lg ml-2">
                        <span className="font-bold">{chat.senderName}: </span>{" "}
                        {chat.content}
                        <div className="text-xs text-gray-600">
                          {new Date(chat.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </li>
                  ))}
                  <div ref={messageEndRef} />
                </ul>
              </div>
              {/* Message Input */}
              <div className="p-3 bg-white flex items-center border-t">
                <textarea
                  className="flex-1 p-2 border rounded-md resize-none focus:outline-none"
                  rows="2"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatroom;
