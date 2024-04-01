import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse} from 'next/server';

connect();

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const {token} = reqBody

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "Account verified successfully",
            success: true
        }, {status: 201})

    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}