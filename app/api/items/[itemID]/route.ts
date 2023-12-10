import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest, { params }: { params: { itemID: string } }) {
    try {
        const { itemID } = params;
        console.log(itemID);

        const specificItem = await prisma.itemsModel.findUnique({
            where: 
            { 
                id: itemID 
            },
        });

        if (!specificItem) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json(specificItem, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        const errorMessage = process.env.NODE_ENV === 'development'
            ? `Internal Server Error: ${error}`
            : 'Internal Server Error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
