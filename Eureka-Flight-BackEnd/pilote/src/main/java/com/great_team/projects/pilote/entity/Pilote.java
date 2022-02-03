package com.great_team.projects.pilote.entity;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Pilote {
	@Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE
        )
	Long numPilote;
	String nomCompletPilote;
	String adressePilote;
	Date dateNaissance;
	Float salaire;
	
	public Pilote() {
		// TODO Auto-generated constructor stub
	}




	public Pilote(Long numPilote, String nomCompletPilote, String adressePilote, Date dateNaissance, Float salaire) {
		super();
		this.numPilote = numPilote;
		this.nomCompletPilote = nomCompletPilote;
		this.adressePilote = adressePilote;
		this.dateNaissance = dateNaissance;
		this.salaire = salaire;
	}




	public Long getNumPilote() {
		return numPilote;
	}




	public void setNumPilote(Long numPilote) {
		this.numPilote = numPilote;
	}




	public String getNomCompletPilote() {
		return nomCompletPilote;
	}




	public void setNomCompletPilote(String nomCompletPilote) {
		this.nomCompletPilote = nomCompletPilote;
	}




	public String getAdressePilote() {
		return adressePilote;
	}




	public void setAdressePilote(String adressePilote) {
		this.adressePilote = adressePilote;
	}




	public Date getDateNaissance() {
		return dateNaissance;
	}




	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}




	public Float getSalaire() {
		return salaire;
	}




	public void setSalaire(Float salaire) {
		this.salaire = salaire;
	}




	@Override
	public String toString() {
		return "Pilote {"
				+ "numPilote:" + numPilote + ", nomCompletPilote:" + nomCompletPilote + ", adressePilote:" + adressePilote + ", dateNaissance:"
				+ dateNaissance + ", salair:" + salaire + "}";
	}
	
	
	
}
