package com.great_team.projects.vol.service;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.great_team.projects.vol.entity.Vol;
import com.great_team.projects.vol.repository.VolRepository;


@Service
public class VolService {
	
	VolRepository volRepository;
	RestTemplate restTemplate;
	
	@Value("${app.cus.urls.avion_service_url}")
	String avionServiceUrl;
	
	@Value("${app.cus.urls.pilote_service_url}")
	String piloteServiceUrl;
	
	@Autowired
	public VolService(VolRepository volRepository, RestTemplate restTemplate) {
		this.volRepository = volRepository;
		this.restTemplate = restTemplate;
	}
	
	public List<Vol> getVolList(){
		return this.volRepository.findAll();
	}

	public Optional<Vol> getVolById(String ref) {
		return this.volRepository.findById(ref);
	}

	public String save(Vol vol) {
		vol.setRefVol(null);
		String villeDepart = vol.getVilleDepart();
		String villeArrivee = vol.getVilleArrivee();
		Date dateVol = vol.getDateVol();
		Time hDepart = vol.gethDepart();
		Time hArrivee = vol.gethArrivee();
		Long pilote = vol.getNumPilote();
		Long avion = vol.getNumAvion();
		if(villeDepart == null || villeArrivee == null || dateVol == null || hDepart == null || 
				hArrivee == null || pilote == null || avion == null) {
			throw new IllegalStateException("les champs de l'entité Vol sont null");
		}
		if(villeDepart.equals("") || villeArrivee.equals("")) {
			throw new IllegalStateException("les champs de l'entité Vol sont null");
		}
		ArrayList<Vol> result = this.volRepository.getVolsWillUseAvion(vol.getNumAvion()) ;
		if(result.isEmpty()) {
			if(this.checkAvionNumIsValid(vol.getNumAvion()) &&  this.checkPiloteNumIsValid(vol.getNumPilote())) {
				this.volRepository.save(vol);
				return "success";
			}
			else {
				throw new IllegalStateException("le numéro de l'avion ou du pilote est invalide");
			}
		}
		else {
			throw new IllegalStateException("l'avion de ce vol est occupée");
		}
	}
	public String upDate(Vol vol) {
		if(vol.getRefVol() == null ) {
			throw new IllegalStateException("absence de reference de Vol");
		}
		String villeDepart = vol.getVilleDepart();
		String villeArrivee = vol.getVilleArrivee();
		Date dateVol = vol.getDateVol();
		Time hDepart = vol.gethDepart();
		Time hArrivee = vol.gethArrivee();
		Long pilote = vol.getNumPilote();
		Long avion = vol.getNumAvion();
		if(villeDepart == null || villeArrivee == null || dateVol == null || hDepart == null || 
				hArrivee == null || pilote == null || avion == null) {
			throw new IllegalStateException("les champs de l'entité Vol sont null");
		}
		if(villeDepart.equals("") || villeArrivee.equals("")) {
			throw new IllegalStateException("les champs de l'entité Vol sont null");
		}
		ArrayList<Vol> result = this.volRepository.getVolsWillUseAvionExcept(vol.getNumAvion(), vol.getRefVol()) ;
		System.out.print(result.isEmpty());
		if(result.isEmpty()) {
			if(this.checkAvionNumIsValid(vol.getNumAvion()) && this.checkPiloteNumIsValid(vol.getNumPilote())) {
				this.volRepository.save(vol);
				return "success";
			}
			else {
				throw new IllegalStateException("le numéro de l'avion ou du pilote est invalide");
			}
		}
		else {
			throw new IllegalStateException("l'avion de ce vol est occupée");
		}
		
	}
	public String delete(String ref) {
		this.volRepository.deleteById(ref);
		return "success";
	}
	
	private boolean checkAvionNumIsValid(Long avionNum) {
		
		String name = restTemplate.getForObject(avionServiceUrl+"/" + avionNum.toString() + "/name", String.class);
		if(name.equals("does not exist")) 
			return false;
		return true;
	}
	private boolean checkPiloteNumIsValid(Long piloteNum) {
		
		String name = restTemplate.getForObject(piloteServiceUrl+"/" + piloteNum.toString() + "/name", String.class);
		if(name.equals("does not exist")) 
			return false;
		return true;
	}
}
