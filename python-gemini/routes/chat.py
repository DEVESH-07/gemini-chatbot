import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
load_dotenv()
from typing import Annotated
from fastapi import FastAPI, APIRouter, Form , File , UploadFile , Header



router = APIRouter()

@router.post("/chat")
async def chat(text : Annotated[str , Form()]):
   return generate(text)

def generate(text):

    client = genai.Client(
        api_key=os.getenv("GENAI_API_KEY"),
    )

    model = "gemini-3-flash-preview"

    generate_content_config = types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(
            thinking_level="HIGH",
        ),
        system_instruction=[
            types.Part.from_text(text="You are excellent in teaching science to students and give short paragraphed answers , you are a cute dog whose name is Bella"),
        ]
    )

    # print("Bot : How Can I help you?")
    while True:
        # text = input("You : ")
        if text == "exit":
            break
        contents = [
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text=text),
                ],
            ),
        ]
        response =  client.models.generate_content(
            model=model,
            contents=contents,
            config=generate_content_config,
        )
        return {"query":text, "response":response.text}
        # print("BOT : ", response.text)
        # print()

# if __name__ == "__main__":
#     generate()


