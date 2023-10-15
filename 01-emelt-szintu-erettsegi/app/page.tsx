'use client';

import { FormEvent, useId, useState } from 'react';
import styles from './page.module.scss';

const MAX_SCORE = 150;

export default function Home() {
	const part1Id = useId();
	const part2Id = useId();
	const part3Id = useId();
	const part4Id = useId();
	const part5Id = useId();

	const [result, setResult] = useState<string | null>(null);
	const [scorePercent, setScorePercent] = useState<number | null>(null);

	const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		const { part1Score, part2Score, part3Score, part4Score, part5Score } =
			Object.fromEntries(formData.entries());

		const score =
			Number(part1Score) +
			Number(part2Score) +
			Number(part3Score) +
			Number(part4Score) +
			Number(part5Score);

		const newScorePercent = (score / MAX_SCORE) * 100;

		let newScore = null;
		switch (true) {
			case newScorePercent >= 60:
				newScore = 'Jeles';
				break;
			case newScorePercent >= 47:
				newScore = 'Jó';
				break;
			case newScorePercent >= 33:
				newScore = 'Közepes';
				break;
			case newScorePercent >= 25:
				newScore = 'Elégséges';
				break;
			default:
				newScore = 'Elégtelen';
				break;
		}

		setResult(newScore);
		setScorePercent(newScorePercent);
	};

	const onResetForm = (_e: FormEvent<HTMLFormElement>) => {
		setResult(null);
		setScorePercent(null);
	};
	return (
		<main className={styles.main}>
			<form
				className={styles.form}
				onSubmit={onSubmitForm}
				onReset={onResetForm}
			>
				<label htmlFor={part1Id}>
					Szövegszerkesztés, prezentáció, grafika, weblapkészítés
				</label>
				<input
					type="number"
					min={0}
					max={30}
					name="part1Score"
					id={part1Id}
				/>
				<label htmlFor={part2Id}>Táblázatkezelés</label>
				<input
					type="number"
					min={0}
					max={15}
					name="part2Score"
					id={part2Id}
				/>
				<label htmlFor={part3Id}>Adatbázis-kezelés</label>
				<input
					type="number"
					min={0}
					max={30}
					name="part3Score"
					id={part3Id}
				/>
				<label htmlFor={part4Id}>Algoritmizálás, adatmodellezés</label>
				<input
					type="number"
					min={0}
					max={45}
					name="part4Score"
					id={part4Id}
				/>
				<label htmlFor={part5Id}>Szóbeli</label>
				<input
					type="number"
					min={0}
					max={30}
					name="part5Score"
					id={part5Id}
				/>
				<button type="reset">Töröl</button>
				<button type="submit">Számít</button>
			</form>
			{result !== null && scorePercent !== null ? (
				<div className={styles.results}>
					<span>Eredmény: {result}</span>
					<span>Százalék: {scorePercent.toFixed(2)} %</span>
				</div>
			) : (
				<span>
					Az eredmény számításához add meg az adatokat először!
				</span>
			)}
		</main>
	);
}
