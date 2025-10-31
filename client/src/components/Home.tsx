import { useState } from "react";
import type { ApiResponse } from "shared";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

function Home() {
	const [data, setData] = useState<ApiResponse | undefined>();

	async function sendRequest() {
		try {
			const req = await fetch(`${SERVER_URL}/hello`);
			const res: ApiResponse = await req.json();
			setData(res);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<h1 className="text-5xl font-black">bhvr</h1>
			<h2 className="text-2xl font-bold">Bun + Hono + Vite + React</h2>
			<p>A typesafe fullstack monorepo</p>
			<div className="flex items-center gap-4">
				<button
					type="button"
					onClick={sendRequest}
					className="bg-black text-white px-2.5 py-1.5 rounded-md"
				>
					Call API
				</button>
				<a
					target="_blank"
					href="https://bhvr.dev"
					className="border-1 border-black text-black px-2.5 py-1.5 rounded-md"
					rel="noopener"
				>
					Docs
				</a>
			</div>
			{data && (
				<pre className="p-4 rounded-md">
					<code>
						Message: {data.message} <br />
						Success: {data.success.toString()}
					</code>
				</pre>
			)}
		</div>
	);
}

export default Home;
