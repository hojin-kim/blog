---
layout: post
title:  "Bounds for Hecke $L$-function and its derivative"
date:   2022-01-19 21:35:00 +0900
category: math/number-theory
---
Recently I had to do some calculations on the bounds of $L$-function and its derivative of cusp form $f$. 

Let $f(\tau) = \sum_{n\ge1} a_n q^n$ where $q= e^{2\pi i \tau}$ be a cusp form of weight $k$, and $L(s) = \sum_{n\ge1} a_n s^n$ be a $L$-function corresponding to $f$.

**Lemma**. ([IK2022, Lemma 3.6 (a)])
If $ s> (k+1)/2$, then 
  
$$ 2- \zeta(2- (k-1)/2)^2 \leq L(s) \leq \zeta(2-(k-1)/2)^2.$$

*Proof.* Let $ \sigma_t(n) = \sum_{d \mid n} d^t $ is the sum of $r$-power of divisor of $n$. 
First we note that 

$$ \sum_{n\ge1} \sigma_t(n)n^{-s} = 
\sum_{n\ge1} \sum_{d\mid n} d^t n^{-s}= 
\sum_{d\ge1} \sum_{\substack{\ell \ge1 \\ n= d\ell}} d^t (d \ell)^{-s} = 
\sum_{d\ge1} d^{-(s-t)} \sum_{\ell \ge1}\ell^{-s} = \zeta(s-t)\zeta(s).
$$

In particular, $\sum_{d\ge1} \frac{ d(n)}{n^s}=\zeta(s)^2$ where $d(n)$ is the number of positive divisors of $n$. 

By Deligne, $\|a_n\| \le d(n) n^{(k-1)/2}$. Then 

$$|L(s)-1| = \sum_{n\ge2}|a_n|n^{-s} \le 
\sum_{n\ge2} d(n) n^{-(s- (k-1)/2)} = \zeta(s- (k-1)/2)^2-1,$$

So we have the result. $\blacksquare$

**Lemma**. ([IK2022, Lemma 3.6 (b)]) Let $r>0$. For $s>r+(k+1)/2$, 

$$|L'(s)| \le \frac{1}{er}\left( \zeta(s-r-(k-1)/2)^2-1\right).$$

*Proof. Note that $L'(s) = -\sum_{n\ge2} a_n \log(n)n^{-s}$ and $er \log x \le x^r$ for all $x>0$, so 

$$\begin{aligned}
|L'(s)| &\le \sum_{n\ge2} \left |a_n \log(n) n^{-s}\right| \le  
\frac{1}{er}\sum_{n\ge2}d(n)
 n^{-(s-r-(k-1)/2)} \\
 & = \frac{1}{er} \left( 
   \zeta(s-r-(k-1)/2)^2-1
   \right),
   \end{aligned}
 $$

So we have the result. $ \blacksquare$

Note that the best $r$ for $\|L'\|$ would be different depending on $s-(k-1)/2$. Also the bounds for higher derivatives can be obtained too.

--- 
References:
* [IK2022] https://doi.org/10.1016/j.jmaa.2021.125971 