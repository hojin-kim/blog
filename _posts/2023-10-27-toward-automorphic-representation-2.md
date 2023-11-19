---
layout: post
title:  "Toward Automorphic Representation 2: Waveforms"
date:   2023-10-27 11:00:00 +0900
category: math/number-theory/automorphic-forms
---

We defined the modular form in the [previous post](20231025-toward-automorphic-representation-1). In this post, we will define the **Waveform**s, the broader class of functions than the modular forms.

Waveform is usually called Maass waveform, but I prefer to call it waveform for some reason.

## Modular form again 

Let $$\Gamma = \Gamma_0(N)$$.

Let $$f \in M_k(\Gamma, \chi)$$ be a modular form (with character $\chi$). We define a non-holomorphic function $$f^*(\tau) := y^{k/2}f(\tau)$$, where $$\tau = x+iy$$. ($$x, y\in \RR$$.) Note that we lost the holomorphy, but still, we can think of $f^*$ as an analytic function of two variables $x$ and $y$.

We define the double-slash operator $$(f^*\|_k \gamma)(\tau) := \left(\dfrac{c\tau + d}{\|c\tau + d\|}\right)^{-k} f^*(\gamma.\tau).$$ Note that the double slash operator is the modified version for the definition of $f^*$; one can easily check that $$\Im (\gamma.\tau) = \frac{\Im(\tau)}{\|c\tau+d\|^2}$$ and $$f^*\|_k\gamma = f^*$$. 

Note that the modularity condition $$f\\|_k \gamma = f$$ is equivalent to $$f^*\|_k \gamma = f^*$$; we will restate the modularity condition for the waveforms with this double-slash operator.

## Waveforms

We drop the holomorphy condition but require that the functions have to be an eigenfunction of the **hyperbolic Laplacian** $$\Delta_k := -y^2\left(\dfrac{\partial^2}{\partial x^2} + \dfrac{\partial^2}{\partial y^2}\right) + iky \dfrac{\partial}{\partial x}$$ to define the **waveform**. It is not a holomorphic function of complex variable $$\tau = x+iy$$, but is a real analytic function $$f(x, y)$$. 

The above is the waveforms of weight 0. We define the waveforms with weight $k$ below. 

Let $$\Gamma \subseteq \SL_2(\RR)$$ be a discrete subgroup. We define the smooth functions $f$ on $$\HH$$ to be a **waveform** of type $\nu$, weight $k$, character $\chi$ and level $$N$$ if 
1. **Modularity**: $$(f\|_k\gamma) (\tau) = \chi(d) f(\tau)$$ for all $\gamma \in \Gamma$, $\tau \in \HH$, with the double slash operator defined above. ($$\chi(\gamma)=\chi(d)$$.)

2. **Eigenfunction**: $$f$$ is an eigenfunction of $\Delta_k$ above, i.e. $\Delta_k (f) = \nu(1-\nu)f$ for some $\nu \in \CC$. 
3. **Growth condition**: $$f(\tau)$$ has moderate growth at every cusp.

4. (optional) $$f$$ is in $L^2$-space, i.e. $$\int_{Y_0(N)}\\|f(\tau)\\|^2 \frac{dxdy}{y^2}<\infty$$.

The space of smooth functions with 1. and 3. is written as $$\mathcal{A}^*_{k, \chi}(\Gamma)$$.

***

The class of Waveform is bigger than the class of modular forms thanks to the following theorem.

**Theorem**. $$f(\tau) \in M_k(\Gamma, \chi)$$ then $$y^{k/2}f(\tau)$$ is a waveform of type $k/2$, weight $k$, character $\chi$ and level $$N$$. 

Since modularity is already shown, only the eigenfunction condition is the problem here. This can be shown by the direct calculation, with the holomorphy condition for $$f$$. 

I mention that the Petersson norm on $$\mathcal{A}^*_{k, \chi}(\Gamma)$$ is defined as $$\|f\|^2 = \int_{Y_0(N)}\\|f(\tau)\\|^2 \frac{dxdy}{y^2}$$, and the Fourier(-Whittaker) expansion for waveform exists, and the notion of cusp waveform can be defined similarly, i.e. with the vanishing constant term.
(Recall that the Petersson norm on holomorphic modular forms is defined as the similar integral but with integrand $$(\Im \tau)^k \\|f(\tau)\\|^2 \frac{dxdy}{y^2}$$, which aligns with the $y^{k/2}$ factors when we give rise the waveform from the holomorphic modular form.)

## Hecke operators
This could be treated in the last post, but we can discuss the Hecke operators and Atkin-Lehner theory on $$\mathcal{A}_{k, \chi}^*(\Gamma_0(N))$$, not only for holomorphic modular forms. (I only skimmed this part, so some errors might exist.)

Again let $$k$$, $$N\ge1$$ are integers, and $\chi$ be a mod $$N$$ Dirichlet character. Let $$\Gamma = \Gamma_0(N)$$. 

Let $$f\in \mathcal{A}_{k, \chi}^*(\Gamma_0(N))$$. We define the **Hecke operator** $$T_n$$ for $$n\ge1$$ as follows:

$$T_n f(\tau) := n^{-1/2}\sum_{ad=n, d>0} \chi(d) \sum_{b=1}^d f\left(\dfrac{a\tau+b}{d}\right).\quad (\tau \in \HH)$$

We have $T_m T_n = \sum_{d \mid (m, n)} \chi(d) T_{mn/d^2}$, which implies that $T_n$ and $T_m$ commutes for all $n$, $m$. Also, they commute with the hyperbolic Laplacian $$\Delta_k$$. 

In the space of $L^2$ functions in $\mathcal{A}_{k, \chi}^*(\Gamma_0(N))$ the adjoint of $T_n$ can be defined as $$T_n^* = \chi(n) T_n$$. Further, if $$(n, N)=1$$ then $$T_n$$ is a normal operator that commutes with each other and with $$\Delta_k$$, and thus they are simultaneously diagonalizable. This gives rise to the basis of all cusp waveforms; its basis functions are said to be **eigenfunction**. 

Say $f(\tau)$ is a waveform of type $$\nu$$, weight $$k$$ and level $$1$$. Then one can check that $$f(Nz)$$ is a waveform of type $$\nu$$, weight $$k$$ and level $$N$$. That is some waveform $$f(Nz)$$ rises from another modular form $$f(z)$$ with lower weights. Simply put, the oldforms are the automorphic forms that rise from the lower-level modular forms, and the **space of newforms** is the orthogonal complement of the space spanned by oldforms (with respect to the Petersson inner product). **Newform**s are the (normalized) Hecke eigenforms in the space of newforms. (Note that 'an element of the space of newforms' might not be a newform.)

Lowering and raising operators (or, Maass lowering and raising operators) for the waveforms are not treated here, but they are important in the theory of automorphic forms; A weight $$k-2$$ waveforms are embedded in the weight $$k$$ waveforms via the waveform raising operator, and the orthogonal complements of the image are from the (holomorphic) modular forms of weight $$k$$, by $$y^{k/2}f(\tau)$$ as explained above. (This is weight-raising and not the level-raising via the Atkin-Lehner theory.)

---
References:
- Goldfeld, Dorian; Hundley, Joseph. **Automorphic representations and L-functions for the general linear group. Volume I.** With exercises and a preface by Xander Faber. Cambridge Stud. Adv. Math., 129. *Cambridge University Press, Cambridge*, 2011.