import type { ICredentialType, INodeProperties } from 'n8n-workflow';

/**
 * "Sign in with VideoGen" via OAuth 2.1 (authorization code + PKCE). Extends
 * n8n's built-in `oAuth2Api` credential, which handles the authorize redirect,
 * token exchange, PKCE, and automatic refresh.
 *
 * VideoGen's authorization server is the Supabase OAuth server, so the endpoints
 * are `{issuer}/oauth/authorize` and `{issuer}/oauth/token` (issuer form:
 * `https://<project>.supabase.co/auth/v1`). Because the issuer is
 * environment-specific and not a secret, the two URLs are left as editable
 * fields rather than baked-in constants — set them once when creating the
 * credential. When the public prod issuer domain is finalized these can be
 * switched to `type: 'hidden'` with fixed defaults for a zero-config experience.
 *
 * The `pkce` grant makes this work with a PUBLIC OAuth client (no client secret):
 * register the client with VideoGen using the redirect URI n8n shows on the
 * credential screen (`<your-n8n-host>/rest/oauth2-credential/callback`) and the
 * scopes below, then paste the client id (client secret can be left blank).
 */
export class VideoGenOAuth2Api implements ICredentialType {
	name = 'videoGenOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'VideoGen OAuth2 API';

	documentationUrl = 'https://docs.videogen.io';

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'pkce',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'https://<project>.supabase.co/auth/v1/oauth/authorize',
			description: "VideoGen authorization endpoint: your issuer base followed by '/oauth/authorize'.",
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'https://<project>.supabase.co/auth/v1/oauth/token',
			description: "VideoGen token endpoint: your issuer base followed by '/oauth/token'.",
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			// `openid` is intentionally omitted: it triggers OIDC ID-token generation,
			// which requires RS256 JWT signing on the project.
			default: 'email profile',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];
}
