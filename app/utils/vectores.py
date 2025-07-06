from langchain_openai import OpenAIEmbeddings
from app.config import OPENAI_API_KEY
from langchain_community.vectorstores import FAISS


embeddings=OpenAIEmbeddings(
    openai_api_type=OPENAI_API_KEY
)

def gen_vectors(chunks):
    vectorStore=FAISS.from_texts(chunks, embeddings)
    return vectorStore
