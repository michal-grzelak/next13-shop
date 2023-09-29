import { type TypedDocumentString } from "@gql/graphql"

export const executeGraphql = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
	options?: RequestInit,
): Promise<TResult> => {
	const response = await fetch(process.env.API_URL, {
		method: "POST",
		body: JSON.stringify({ query, variables }),
		headers: {
			"Content-Type": "application/json",
		},
		...options,
	})

	const gqlResponse = (await response.json()) as GraphqlResponse<TResult>

	if (gqlResponse.errors) {
		throw new Error(gqlResponse.errors[0].message, { cause: gqlResponse.errors })
	}

	return gqlResponse.data
}

type GraphqlResponse<T> =
	| { data?: undefined; errors: { message: string }[] }
	| { data: T; errors?: undefined }
