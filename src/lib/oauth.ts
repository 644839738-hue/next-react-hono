"use server";

import { createAdminClient } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function signUpWithGithub() {
  const { account } = await createAdminClient();

  const origin = headers().get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github, // 第1个参数: provider
    `${origin}/oauth`, // 第2个参数: success url
    `${origin}/sign-up` // 第3个参数: failure url
  );

  return redirect(redirectUrl);
}
