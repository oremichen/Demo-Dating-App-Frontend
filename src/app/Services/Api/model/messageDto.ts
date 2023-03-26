export interface MessageDto {
    id?: number;
    senderId?: number;
    senderUsername?: string;
    recepientId?: number;
    recepientName?: string;
    content?: string;
    dateRead?: Date;
    messageSent?: Date;
    senderDeleted?: boolean;
    recipientDeleted?: boolean;
    senderPhotoUrl?: string;
    recepientPhotoUrl?: string;
}