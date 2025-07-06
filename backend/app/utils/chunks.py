from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.logger import logger

def text_chunks(text):
    try:
        splitter=RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )
        chunks=splitter.split_text(text)
        logger.info(f"Successfully split text into {len(chunks)} chunks.")
        return chunks
    except Exception as e:
        logger.exception("Failed to create text chunks.")
        raise RuntimeError(f"Error during text splitting: {e}")