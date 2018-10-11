import CustomEvents from "./CustomEvents";
import {store} from '../redux/store/index'
import { setTickets } from "../redux/actions";

export default class ChatUtils {

    static eventAux;

    static registerHandlers() {

        const { groupChatManager } = window;
        
        // new invitations
        groupChatManager._manager.onInvitation((event) => {
            ChatUtils.eventAux = event;
            const [topic, message] = event.value.name.split("-");
            var newTicketEvent = new CustomEvent(CustomEvents.newTicket, {
                detail: {
                    topic: topic,
                    message: message
                }
            });
            dispatchEvent(newTicketEvent);
        });

        // resume chats
        groupChatManager.onResumeObserver((chatControllers) => {
            let tickets = Object.values(chatControllers);
            const chatName = 'f';
            function isNotForum(ticket) {
                return ticket.dataObject['_name'] !== chatName
            }
            tickets = tickets.filter(ticket => isNotForum(ticket));
            
            if (tickets.length >= 0) {
                console.log('Tickets: ', tickets);
                
                store.dispatch(setTickets(tickets));
                tickets.forEach((chatController) => {
                    ChatUtils.prepareChat(chatController, false, true);
                });
            }
        });
    }

    static closeConfirmation = (next) => {
        const { groupChatManager } = window;
        if(next){
            // send ack
            ChatUtils.eventAux.ack();
            // accept ticket
            groupChatManager._manager.join(ChatUtils.eventAux.url).then((chatController) => {
                debugger;
                this.prepareChat(chatController, false);
            }).catch(function (reason) {
                console.error('Error connecting to', reason);
            });
        }
        // else{

        // }
    }

    static prepareChat = (chatController, isOwner, toReload = null) => {

        // console.log(this.logMessage, 'Chat Group Controller: ', chatController);

        let dataObject = chatController.dataObjectObserver || chatController.dataObjectReporter || {};
        // console.log((_this.logMessage, ' dataObject: ' , dataObject);
        let users = dataObject.data.participants || {};
        let msgs = chatController.messages || {};
        console.log('Chat Group Controller: ', users, msgs);


        // Object.keys(users).forEach(function (objectKey, index) {
        //   var user = users[objectKey];
        //   processNewUser(user);
        // });

        // Object.keys(msgs).forEach(function (objectKey, index) {
        //   let msg = {
        //     value: msgs[objectKey].data,
        //     identity: msgs[objectKey].identity
        //   };

        //   if (msgs[objectKey].resourceType) msg.resource = msgs[objectKey];

        //   console.log('[GroupChatManagerDemo.prepareChat] for msg ', msg);

        //   processMessage(msg, toReload);
        // });

        chatController.onInvitationResponse(function (response) {
            console.info(this.logMessage, '[GroupChatManagerDemo ] onInvitationResponse: ', response);
        })

        chatController.onMessage(function (message) {
            console.info(this.logMessage, '[GroupChatManagerDemo ] new message received: ', message);
            // processMessage(message);
        });

        chatController.onChange(function (event) {
            console.log(this.logMessage, '[GroupChatManagerDemo ] OnChange Event:', event);
        });

        chatController.onUserAdded(function (event) {
            console.log(this.logMessage, '[GroupChatManagerDemo ] onUserAdded Event:', event);
            // processNewUser(event);
        });

        // chatController.onUserRemoved(function (event) {
        //   console.log('[GroupChatManagerDemo ] onUserRemoved Event:', event);
        //   removeParticipant(event.userURL);
        // });
    }
}

