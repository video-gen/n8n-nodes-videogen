import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

/**
 * API-key authentication for VideoGen. The key is sent as a bearer token on every
 * request. Create a key on the VideoGen Developers page.
 */
export class VideoGenApi implements ICredentialType {
	name = 'videoGenApi';

	displayName = 'VideoGen API';

	icon: Icon = {
		light: 'file:../nodes/VideoGen/videogen.svg',
		dark: 'file:../nodes/VideoGen/videogen.dark.svg',
	};

	documentationUrl = 'https://docs.videogen.io';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Create an API key on the VideoGen Developers page (https://app.videogen.io/api).',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	// Validates the key: any 2xx from /v1/me means it works.
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.videogen.io',
			url: '/v1/me',
		},
	};
}
