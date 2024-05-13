import React, { useEffect } from 'react';
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: '5aa36992a87ce596f53ea2d821839131cdf95814652fd55a0d5b93858ffa1df9',
    dangerouslyAllowBrowser: true,
    baseURL: 'https://api.together.xyz/v1',
  
});

const userText = {
    text: ' In chemistry basics, matter and its properties are fundamental concepts. Matter encompasses anything that occupies space and has mass, with properties like color, odor, taste, and texture used to describe it. Atoms, the basic units of matter, consist of protons, neutrons, and electrons, while elements are substances composed of only one type of atom. Chemical bonding involves ionic bonds formed by electron transfer, covalent bonds formed by electron sharing, and metallic bonds where electrons are shared by a lattice of atoms. Chemical reactions involve reactants transforming into products, with various types including synthesis, decomposition, and combustion. Acids donate protons, bases accept them, and the pH scale measures solution acidity or alkalinity. Chemical equations balance reactants and products, while stoichiometry studies their quantitative relationships. States of matter include solids with definite shape and volume, liquids with definite volume but no fixed shape, and gases with neither. Thermodynamics deals with heat transfer, including endothermic and exothermic reactions. Solutions are homogeneous mixtures with solvents and solutes, with solubility indicating the maximum solute that can dissolve. Organic chemistry focuses on carbon compounds and functional groups, while the periodic table categorizes elements into groups and periods. Chemical kinetics studies reaction rates and influencing factors like concentration and temperature, while electrochemistry involves redox reactions and electrolysis.',
    numQuestions: '2', 
    typeOfQuestions: 'Multiple Choice'
}

async function createQuiz() {
  try {
    const response = await client.chat.completions.create({
        messages: [
            {
            role: 'user',
            content: JSON.stringify(userText)
            },
        ],
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    });
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
}

const QuizComponent = () => {
  useEffect(() => {
    createQuiz();
  }, []);

  return (
    <div>
      <h1> Quiz generation page that calls the together AI API key</h1>
    </div>
  );
};

export default QuizComponent;
