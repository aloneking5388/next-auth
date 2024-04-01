import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export const GET = async (request: NextRequest) => {
  const userId = await getDataFromToken(request);

  const user = await User.findById({ _id: userId }).select("-password");

  if(!user) {
    return NextResponse.json({error: "user Not Found"}, {status: 404})
  }

  return NextResponse.json({
    message: "User Found",
    data: user,
  });
};
