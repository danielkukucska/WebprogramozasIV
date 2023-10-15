'use client';
import { FormEvent, useId, useState } from 'react';
import styles from './page.module.css';

const READING_MAX_SCORE = 25;
const WRITING_MAX_SCORE = 25;
const WRITTEN_MAX_SCORE = READING_MAX_SCORE + WRITING_MAX_SCORE;
const LISTENING_MAX_SCORE = 25;
const SPEAKING_MAX_SCORE = 25;
const ORAL_MAX_SCORE = LISTENING_MAX_SCORE + SPEAKING_MAX_SCORE;
const MAX_SCORE = ORAL_MAX_SCORE + WRITTEN_MAX_SCORE;
const SUB_PART_BAR = 0.4;
const TOTAL_BAR = 0.6;

export default function Home() {
	const examTypeId = useId();
	const readingId = useId();
	const writingId = useId();
	const listeningId = useId();
	const speakingId = useId();

	const [result, setResult] = useState<string | null>(null);

	const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const {
			examType,
			readingScore,
			writingScore,
			listeningScore,
			speakingScore,
		} = Object.fromEntries(formData.entries());

		const passedListening = passedPart(
			Number(listeningScore),
			LISTENING_MAX_SCORE,
			SUB_PART_BAR
		);

		const passedSpeaking = passedPart(
			Number(speakingScore),
			SPEAKING_MAX_SCORE,
			SUB_PART_BAR
		);

		const passedReading = passedPart(
			Number(readingScore),
			READING_MAX_SCORE,
			SUB_PART_BAR
		);

		const passedWriting = passedPart(
			Number(writingScore),
			WRITING_MAX_SCORE,
			SUB_PART_BAR
		);

		switch (examType) {
			case 'SZ':
				const passedOral =
					passedListening &&
					passedSpeaking &&
					passedPart(
						Number(readingScore) + Number(writingScore),
						ORAL_MAX_SCORE,
						TOTAL_BAR
					);

				setResult(
					`${passedOral ? 'Sikeres' : 'Sikertelen'} írásbeli vizsga!`
				);

				break;
			case 'Í':
				const passedWritten =
					passedReading &&
					passedWriting &&
					passedPart(
						Number(readingScore) + Number(writingScore),
						WRITTEN_MAX_SCORE,
						TOTAL_BAR
					);
				setResult(
					`${
						passedWritten ? 'Sikeres' : 'Sikertelen'
					} írásbeli vizsga!`
				);
				break;
			default: //K
				const passedAll =
					passedListening &&
					passedSpeaking &&
					passedReading &&
					passedWriting &&
					passedPart(
						Number(readingScore) +
							Number(writingScore) +
							Number(readingScore) +
							Number(writingScore),
						MAX_SCORE,
						TOTAL_BAR
					);
				setResult(
					`${passedAll ? 'Sikeres' : 'Sikertelen'} komplex vizsga!`
				);
				break;
		}
	};

	const passedPart = (score: number, maxScore: number, bar: number) =>
		score / maxScore >= bar;

	const onResetForm = (_e: FormEvent<HTMLFormElement>) => {
		setResult(null);
	};
	return (
		<main className={styles.main}>
			<form
				className={styles.form}
				onSubmit={onSubmitForm}
				onReset={onResetForm}
			>
				<label htmlFor={examTypeId}>Vizsga típusa</label>
				<input type="TEXT" name="examType" id={examTypeId} />
				<label htmlFor={readingId}>Olvasáskészség</label>
				<input
					type="number"
					min={0}
					max={READING_MAX_SCORE}
					name="readingScore"
					id={readingId}
				/>
				<label htmlFor={writingId}>Íráskészség</label>
				<input
					type="number"
					min={0}
					max={30}
					name="writingScore"
					id={writingId}
				/>
				<label htmlFor={listeningId}>Beszédértés</label>
				<input
					type="number"
					min={0}
					max={LISTENING_MAX_SCORE}
					name="listeningScore"
					id={listeningId}
				/>
				<label htmlFor={speakingId}>Beszédkészség</label>
				<input
					type="number"
					min={0}
					max={SPEAKING_MAX_SCORE}
					name="speakingScore"
					id={speakingId}
				/>
				<button type="reset">Töröl</button>
				<button type="submit">Számol</button>
			</form>
			<div>{result}</div>
		</main>
	);
}
