'use client';
import { useMemo, useState } from 'react';
import styles from './bmi.module.scss';

export default function BMI() {
	const [weight, setWeight] = useState<number>(50);
	const [height, setHeight] = useState<number>(1.6);
	const [bmi, setBmi] = useState<number | null>(null);

	const increaseWeight = () => setWeight((prev) => prev + 1);
	const decreaseWeight = () => setWeight((prev) => prev - 1);
	const increaseHeight = () => setHeight((prev) => prev + 0.1);
	const decreaseHeight = () => setHeight((prev) => prev - 0.1);

	const calculateBmi = () => setBmi(weight / Math.pow(height, 2));

	const bmiResult = useMemo(() => {
		if (bmi === null) return 'nem számítható';
		if (bmi < 16) return 'kóros soványság';
		if (bmi < 17) return 'mérsékelt soványság';
		if (bmi < 18.5) return 'enyhe soványság';
		if (bmi < 25) return 'normális testsúly';
		if (bmi < 30) return 'túlsúly';
		if (bmi < 40) return 'elhízás';
		return 'extrém elhízás';
	}, [bmi]);

	return (
		<div className={styles.bmi}>
			<div className={styles.weight}>
				<span>Súly: {weight.toFixed(0)} kg</span>
				<button onClick={decreaseWeight}>Súly csökkentése</button>
				<button onClick={increaseWeight}>Súly növelése</button>
			</div>
			<div className={styles.height}>
				<span>Magasság: {height.toFixed(1)} m</span>
				<button onClick={decreaseHeight}>Magasság csökkentése</button>
				<button onClick={increaseHeight}>Magasság növelése</button>
			</div>
			<div className={styles.result}>
				<span>BMI: {bmi}</span>
				<button onClick={calculateBmi}>Számol</button>
				<span>Testsúlyosztály: {bmiResult}</span>
			</div>
		</div>
	);
}
