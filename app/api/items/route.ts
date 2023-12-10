import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "./validationSchema";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("Request Body:", body);

        const validation = createIssueSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const newIssue = await prisma.itemsModel.create({
            data: { name: body.name, description: body.description, price: body.price, image: body.image},
        });

        return NextResponse.json(newIssue, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        const errorMessage = `Internal Server Error: ${error}`;
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        // Fetch all items from the database
        const allItems = await prisma.itemsModel.findMany();

        return NextResponse.json(allItems, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        const errorMessage = `Internal Server Error: ${error}`;
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

