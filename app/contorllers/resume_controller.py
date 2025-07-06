from app.utils.extract_pdf_text import extract_pdf_text
from app.utils.chunks import text_chunks
from app.logger import logger
from app.utils.vectores import gen_vectors

async def resume_precess(resume_pdf, jd_text):
    try:
        resume_text=extract_pdf_text(resume_pdf)

        resume_chunks=text_chunks(resume_text)
        jd_chunks=text_chunks(jd_text)
        logger.info("Extrancted chunks from texts")

        resume_vectorStore=gen_vectors(resume_chunks)
        jd_vectorStore=gen_vectors(jd_chunks)

        def similariy_score(query, vector):
            docs_score=vector.similarity_search_with_score(query, k=3)
            avg_score=sum([score for _, score in docs_score]) / len(docs_score)
            return 1 / (1 + avg_score)
        
        jd_to_resume_score=sum(
            similariy_score(chunk, resume_vectorStore) for chunk in jd_chunks
        ) / len(jd_chunks)

        resume_to_jd_score=sum(
            similariy_score(chunk, jd_vectorStore) for chunk in resume_chunks
        )/len(resume_chunks)

        final_score=round((jd_to_resume_score + resume_to_jd_score) / 2 * 100, 2)

        return float(final_score)
        

    except Exception as e:
        logger.exception(f"Failed to send the chunks {e}")
        raise RuntimeError(f"Error during text splitting: {e}")
        