import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadDialogues } from './DialoguesSlice';
import { createDialogue } from './api';
import User from '../auth/types/User';

export default function DialoguesList(): JSX.Element {
	const dispatch = useAppDispatch();
	const dialogues = useAppSelector((state) => state.dialogues.dialogues);
	const [newMessage, setNewMessage] = useState<string>('');
	const user: User | undefined = useAppSelector((state) => state.auth.user);

	useEffect(() => {
		dispatch(loadDialogues());
	}, [dispatch]);

	console.log(dialogues);

	// {
	//   "dialogues": [
	//     {"id": 1,
	//       "recipient": {"id": 1,"firstName": "Sergey","lastName": "Sedakov"},
	//       "messages": [{"id": 1,"senderId": 1,"messageDateTime": "1990-03-05 10:44:14.000000","messageText": "Kurlyk! Kurlyk!"}]
	//     }
	//   ]
	// }
	function handleSendMessage(recipientId: number, messageText: string): void {
		dispatch(
			createDialogue({
				recipientId,
				messageText,
			})
		);
		setNewMessage('');
	}

	return (
		<div>
			{dialogues.map((dialogue) => (
				<div key={dialogue.id}>
					<h2>
						{' '}
						Dialogue with {dialogue.recipient.firstName} {dialogue.recipient.lastName}
					</h2>
					<ul>
						{dialogue.messages.map((message) => {
							if (message.senderId === dialogue.recipient.id) {
								return (
									<li key={message.id}>
										{`${dialogue.recipient.firstName}: ${message.messageText}`}
									</li>
								);
							} else {
								return <li key={message.id}>{`${user?.firstName}: ${message.messageText}`}</li>;
							}
						})}
					</ul>
					<textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
					<button onClick={() => handleSendMessage(dialogue.recipient.id, newMessage)}>
						Send a message
					</button>
				</div>
			))}
		</div>
	);
}