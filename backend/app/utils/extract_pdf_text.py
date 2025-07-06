from langchain_community.document_loaders import PyPDFLoader
from app.logger import logger
import tempfile


def extract_pdf_text(pdf):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
            contents=pdf.file.read()
            tmp.write(contents)
            tmp_path=tmp.name

        loader=PyPDFLoader(tmp_path)
        pages=loader.load()
        logger.info("Extracted uploaded pdf text")
        return " ".join([page.page_content for page in pages])
    except Exception as e:
        logger.exception(f"Failedto extract text from PDF: {e}")
        raise RuntimeError(f"Error processing PDF '{pdf}'")