import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
	Button,
	Frame,
	Layout,
	Page,
	Toast,
	Modal,
	TextContainer,
	Form,
	FormLayout,
	TextField
} from '@shopify/polaris';
import EmailEditor from 'react-email-editor';

import { database, jsonify } from '../server/middlewares/database';
import Template from '../server/model/template';

export async function getServerSideProps(context) {
	database();
	const templates = await Template.find({}).exec();

	return {
		props: {
			templates: jsonify(templates)
		}
	};
}

const Index = ({ templates }) => {
	const emailEditorRef = useRef(null);
	const [ active, setActive ] = useState(false);
	const [ modalActive, setModalActive ] = useState(false);
	const [ template, setTemplate ] = useState('');

	const toggleActive = useCallback(() => {
		setActive((active) => !active);
		console.log('Editor Ready');
	}, []);

	const handleChange = useCallback(() => setModalActive(!modalActive), [ modalActive ]);

	const toastMarkup = active ? <Toast content="Welcome!" onDismiss={toggleActive} /> : null;

	const handleSave = () => {
		console.log(template);
		// window.api.get('/1').then((response) => {
		// 	console.log(response.data);
		// });
		emailEditorRef.current.exportHtml((data) => {
			const { design, html } = data;
			// const res =
		});
	};

	useEffect(() => {
		toggleActive();
	}, []);

	return (
		<Page>
			<Layout>
				<Layout.AnnotatedSection
					title="Email Editor App! 🎉"
					description="Hit refresh to start from scratch, and don't forget to save."
				>
					<Layout.Section>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-evenly',
								margin: 'auto',
								background: '#22222222',
								padding: '10px'
							}}
						>
							<Button onClick={handleChange}>Edit a Template</Button>
							<Button onClick={handleChange}>Save the Template</Button>
						</div>
					</Layout.Section>
				</Layout.AnnotatedSection>
				<Layout.Section>
					<Frame>
						{toastMarkup}
						<EmailEditor ref={emailEditorRef} />
					</Frame>
				</Layout.Section>
			</Layout>
			<div>
				<Modal
					open={modalActive}
					onClose={handleChange}
					title="Retrieve all the templates created, simply by saving them."
					primaryAction={{
						content: 'Save',
						onAction: handleSave
					}}
					secondaryActions={[
						{
							content: 'Close',
							onAction: handleChange
						}
					]}
				>
					<Modal.Section>
						<Form>
							<FormLayout>
								<TextField
									value={template}
									onChange={setTemplate}
									label="Enter Template Name"
									type="text"
									helpText={
										<span>
											A template name is useful to search and edit a template from the database.
										</span>
									}
								/>
							</FormLayout>
						</Form>
						{/* <TextContainer>
							<p>
								Use Instagram posts to share your products with millions of people. Let shoppers buy
								from your store without leaving Instagram.
							</p>
						</TextContainer> */}
					</Modal.Section>
				</Modal>
			</div>
		</Page>
	);
};

export default Index;
