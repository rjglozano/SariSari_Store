import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface UpdateItemRequestBody {
    id?:string,
    name?: string;
    description?: string;
    price?: string;
    image?: string;
  }
  
    
export async function GET(req: NextRequest, { params }: { params: { itemID: string } }) {
    try {
        const { itemID } = params;
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
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { itemID: string } }) {
    try {
        const { itemID } = params;
        const deletedItem = await prisma.itemsModel.delete({
            where: { id: itemID },
        });

        if (!deletedItem) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { itemID: string } }) {
   
    const body = await req.json();
    try {
        const { itemID } = params;
        const updatedItem = await prisma.itemsModel.update({
            where: { id: itemID },
            data: body,
        });


        if (!updatedItem) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred during the update' }, { status: 500 });
    }
}

