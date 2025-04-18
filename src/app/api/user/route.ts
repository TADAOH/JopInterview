import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.token) {
        return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    const profile = await getUserProfile(session.user.token);
    return new Response(JSON.stringify(profile.data), { status: 200 });
}