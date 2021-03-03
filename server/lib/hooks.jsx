import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export function useTemplate() {
	const { data, mutate } = useSWR('/api/template', fetcher);
	const template = data && data.template;
	return [ template, { mutate } ];
}
