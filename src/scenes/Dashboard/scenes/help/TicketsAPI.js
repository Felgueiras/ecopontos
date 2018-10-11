// import {store} from '../../../../../stories/FaleConnosco'
import { store } from '../../../../redux/store/index'

export default class TicketsAPI {

    static getMessageSender(myGuid, msgGuid) {
        return msgGuid === myGuid ? 'me' : 'other'
    }



    static getMessages(messagesRaw, forum = false) {
        if (!messagesRaw) return [];
        const myGuid = store.getState().identity.guid;

        let messages = [];
        Object.keys(messagesRaw).forEach(element => {
            const message = messagesRaw[element];
            let msgGuid;
            if (!message.identity.userProfile) {
                msgGuid = message.identity.guid;
            }
            else {
                msgGuid = message.identity.userProfile.guid;
            }
            if (forum) {
                messages.push(message);
            }
            else {
                const msgObj = new DSMMessage(this.getMessageSender(myGuid, msgGuid), message.data.content)
                messages.push(msgObj);
            }

        });
        return messages;
    }

    static parseNewMessage(message) {
        const myGuid = store.getState().identity.guid;
        const msgGuid = message.identity.userProfile.guid;
        const msgObj = new DSMMessage(this.getMessageSender(myGuid, msgGuid), message.value.content)
        return msgObj;
    }
}

export const DSMMessage = class Message {
    constructor(sender, text) {
        this.sender = sender;
        this.text = text;
    }
}