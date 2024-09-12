
/**
 * MathHyeon.js
 * 
 */

class MathHyeon {

    /**
     * 중복되지 않는 랜덤 숫자 배열 생성
     * @param {number} size - 반환할 배열의 크기
     * @param {number} min -  무작위로 뽑을 수의 최솟값
     * @param {number} max -  무작위로 뽑을 수의 최댓값
     * @returns  array
     */
    getRandomUniqueNumbers(size, min, max) {
        // Step 1: Create an array with numbers from min to max
        const numbers = [];
        for (let i = min; i <= max; i++) {
          numbers.push(i);
        }
      
        // Step 2: Shuffle the array using the Fisher-Yates algorithm
        for (let i = numbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap elements
        }
      
        // Step 3: Return the first 'size' elements of the shuffled array
        return numbers.slice(0, size);
    }     
}

const mathHyeon = new MathHyeon();