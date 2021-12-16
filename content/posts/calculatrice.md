---
title: "Calculatrice"
date: 2021-12-02T19:05:37+01:00
draft: false
thumbnailImage: ../img/calculatrice0.png

---

# Calculatrice

![](calculatriceJava.png)

## Présentation

Il s'agit ici d'une version simplifée :

-   Calculs sur les réels

-   Opérations arithmétiques élémentaires :   
    -   Division
    
    -   Multiplication
    
    -   Addition

    -   Soustraction   

-   Possibilité d'effacer le dernier caractère saisi

-   Reprendre le calcul à partir de la dernière valeur calculée.

## Méthode d'évaluation d'une expression artithmétique

L'expression **expression** est stockée sous forme de chaîne de caractères.   
Deux piles sont initialisées : 
-   **ops** pour stocker les opérateurs : + - * / 
-   **pileExpression** pour stocker les valeurs sucessives de **expression**.  

La méthode *effectuerCalcul(ops , pile expression)* utilisée est définie ainsi:
    
<pre style='text-align: left; border: 1px dashed #008DEF; line-height: 18px; padding: 15px; font-size: 13px; font-family:'Courier New', Courier, monospace; overflow: auto;'>​public <span style='font-weight:bold;color:#7B0052;'>static</span> <span style='font-weight:bold;color:#7B0052;'>void</span> effectuerCalcul(Stack&lt;Character&gt; ops, Stack&lt;Double&gt; pileExpression) <span style='font-weight:bold;color:#D3171B'>{</span>
       ​char operateur = ops.pop();
       ​double valeur2 = pileExpression.pop();
       ​double valeur1 = pileExpression.pop();
       ​double resultat = 0;
       
       ​switch (operateur) <span style='font-weight:bold;color:#D3171B'>{</span>
       ​case plus:
           ​resultat = valeur1 + valeur2;
           ​break;
       ​case moins:
           ​resultat = valeur1 - valeur2;
           ​break;
       ​case mul:
           ​resultat = valeur1 * valeur2;
           ​break;
       ​case div:
           ​if (valeur2 == 0)
               ​throw <span style='font-weight:bold;color:#7B0052;'>new</span> UnsupportedOperationException(<span style='color:#2A00FF'>"division par zero impossible"</span>);
           ​resultat = (<span style='font-weight:bold;color:#7B0052;'>double</span>) (valeur1 / valeur2);
           ​break;
       ​<span style='font-weight:bold;color:#D3171B'>}</span>
       ​pileExpression.push(resultat);
   ​<span style='font-weight:bold;color:#D3171B'>}</span></pre>
Pour rappel, la méthode *pop* d'une pile retourne son sommet et le retire de la pile.

Chaque caractère de l'expression arithmétique est lu.   

-   Si le caractère est un opérateur (**opi**), alors :   
    -   Soit l'opérateur au sommet (**opSommet**) de la pile **ops** est prioritaire par rapport à **opi** et dans ce cas la méthode *effectuerCalcul(ops , pile expression)* est appelée

    -   Soit il ne l'est pas et opi est simplement stockée au sommet de **ops**.   
   
-   Si le caractère est un chiffre alors cette lecture continue tant que le carcactère suivant est lui aussi un nombre ou un . (pour pouvoir stocker des réels)   

-   Si le caractère est une parenthèse ouvrante alors il est stocké au sommet de **ops**. 

-   Si le caractère est une parenthèse fermante alors tant que le sommet de **ops** n'est pas une parenthèse ouvrante la méthode *effectuerCalcul(ops , pile expression)* est appelée.   
Ensuite **ops** est dépilé.   
Par exemple pour l'expression : 1+(2+(3+4)) les états successifs de **pileExpression** sont   
        
        1  
        1 2    
        1 2 3    
        1 2 3 4      
        1 2 7   
        1 9    
        10   
    et ceux de **ops** sont   
    
        +   
        + (    
        + ( +   
        + ( + (        
        + ( + ( +

## Exemples

Illustrations de ce qui se passe au niveau de la pile des opérateurs et de la pile servant à stocker les résultats successifs de l'évaluation d'une expression.   

Ces résultats sont aussi observables dans le fichier généré par les logs : **logs/logPileCalculs.log**   

![](exemplesPile.jpg)

## Utilisation :

-   Cloner le projet
-   Dans un terminal : java -jar calculatrice-0.1.0.jar
